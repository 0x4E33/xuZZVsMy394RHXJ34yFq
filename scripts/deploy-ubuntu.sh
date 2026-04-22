#!/usr/bin/env bash

set -Eeuo pipefail

APP_NAME="${APP_NAME:-epay-official-website}"
SERVICE_NAME="${SERVICE_NAME:-$APP_NAME}"
APP_USER="${APP_USER:-epay}"
APP_GROUP="${APP_GROUP:-$APP_USER}"
APP_DIR="${APP_DIR:-/var/www/$APP_NAME}"
APP_PORT="${APP_PORT:-3000}"
APP_HOST="${APP_HOST:-127.0.0.1}"
DOMAIN="${DOMAIN:-_}"
ENABLE_NGINX="${ENABLE_NGINX:-1}"
APT_UPGRADE="${APT_UPGRADE:-0}"
NODE_MAJOR="${NODE_MAJOR:-22}"
NODE_MIN_VERSION="${NODE_MIN_VERSION:-20.9.0}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_SRC="${PROJECT_SRC:-$(cd "$SCRIPT_DIR/.." && pwd)}"
ENV_FILE="/etc/${SERVICE_NAME}.env"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
NGINX_SITE="/etc/nginx/sites-available/${SERVICE_NAME}"
NGINX_ENABLED_SITE="/etc/nginx/sites-enabled/${SERVICE_NAME}"

if [[ "${EUID}" -ne 0 ]]; then
  if ! command -v sudo >/dev/null 2>&1; then
    echo "This script must run as root or with sudo."
    exit 1
  fi
  exec sudo -E bash "$0" "$@"
fi

log() {
  echo
  echo "[deploy] $1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

version_ge() {
  dpkg --compare-versions "$1" ge "$2"
}

install_apt_packages() {
  log "Updating apt package index"
  apt-get update -y

  if [[ "$APT_UPGRADE" == "1" ]]; then
    log "Upgrading installed apt packages"
    DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
  fi

  log "Installing system packages"
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    gnupg \
    nginx \
    rsync \
    unzip
}

install_nodejs() {
  if command -v node >/dev/null 2>&1; then
    local current_version
    current_version="$(node -v | sed 's/^v//')"
    if version_ge "$current_version" "$NODE_MIN_VERSION"; then
      log "Node.js ${current_version} already satisfies >= ${NODE_MIN_VERSION}"
      return
    fi
  fi

  log "Installing Node.js ${NODE_MAJOR}.x from NodeSource"
  install -d -m 0755 /etc/apt/keyrings
  rm -f /etc/apt/keyrings/nodesource.gpg
  curl -fsSL "https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key" | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  chmod 0644 /etc/apt/keyrings/nodesource.gpg

  cat >/etc/apt/sources.list.d/nodesource.list <<EOF
deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main
EOF

  apt-get update -y
  DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs

  local installed_version
  installed_version="$(node -v | sed 's/^v//')"
  if ! version_ge "$installed_version" "$NODE_MIN_VERSION"; then
    echo "Installed Node.js ${installed_version}, but ${NODE_MIN_VERSION}+ is required."
    exit 1
  fi

  log "Using Node.js ${installed_version}"
}

ensure_runtime_user() {
  if ! getent group "$APP_GROUP" >/dev/null 2>&1; then
    groupadd --system "$APP_GROUP"
  fi

  if ! id -u "$APP_USER" >/dev/null 2>&1; then
    useradd \
      --system \
      --gid "$APP_GROUP" \
      --home-dir "$APP_DIR" \
      --create-home \
      --shell /usr/sbin/nologin \
      "$APP_USER"
  fi
}

sync_project_files() {
  log "Syncing project files to ${APP_DIR}"
  install -d -m 0755 "$APP_DIR"

  rsync -a --delete \
    --exclude ".git" \
    --exclude ".github" \
    --exclude ".next" \
    --exclude "node_modules" \
    --exclude ".DS_Store" \
    "$PROJECT_SRC"/ "$APP_DIR"/

  chown -R "$APP_USER:$APP_GROUP" "$APP_DIR"
}

run_as_app_user() {
  runuser -u "$APP_USER" -- bash -lc "cd '$APP_DIR' && $1"
}

build_project() {
  log "Installing npm dependencies"
  run_as_app_user "npm ci"

  log "Building Next.js application"
  run_as_app_user "npm run build"

  log "Copying static assets into standalone output"
  run_as_app_user "rm -rf .next/standalone/public .next/standalone/.next/static"
  run_as_app_user "mkdir -p .next/standalone/.next"
  run_as_app_user "cp -R public .next/standalone/public"
  run_as_app_user "cp -R .next/static .next/standalone/.next/static"
}

write_env_file() {
  if [[ "$ENABLE_NGINX" != "1" && "$APP_HOST" == "127.0.0.1" ]]; then
    APP_HOST="0.0.0.0"
  fi

  log "Writing service environment file"
  cat >"$ENV_FILE" <<EOF
NODE_ENV=production
PORT=${APP_PORT}
HOSTNAME=${APP_HOST}
EOF
  chmod 0644 "$ENV_FILE"
}

write_systemd_service() {
  log "Writing systemd service"
  cat >"$SERVICE_FILE" <<EOF
[Unit]
Description=${APP_NAME} Next.js service
After=network.target

[Service]
Type=simple
User=${APP_USER}
Group=${APP_GROUP}
WorkingDirectory=${APP_DIR}/.next/standalone
EnvironmentFile=-${ENV_FILE}
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
KillSignal=SIGTERM

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable "$SERVICE_NAME"
  systemctl restart "$SERVICE_NAME"
}

configure_nginx() {
  if [[ "$ENABLE_NGINX" != "1" ]]; then
    log "Skipping nginx configuration"
    return
  fi

  log "Configuring nginx reverse proxy"
  cat >"$NGINX_SITE" <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

  ln -sfn "$NGINX_SITE" "$NGINX_ENABLED_SITE"
  rm -f /etc/nginx/sites-enabled/default

  nginx -t
  systemctl enable nginx
  systemctl restart nginx

  if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
    ufw allow OpenSSH >/dev/null 2>&1 || true
    ufw allow 'Nginx Full' >/dev/null 2>&1 || true
  fi
}

health_check() {
  log "Checking service status"
  local attempt
  local status_code=""

  for attempt in {1..20}; do
    if systemctl is-active --quiet "$SERVICE_NAME"; then
      status_code="$(curl -I -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${APP_PORT}" || true)"
      case "$status_code" in
        2*|3*)
          return
          ;;
      esac
    fi
    sleep 1
  done

  echo "Local health check failed with HTTP ${status_code:-unknown}"
  journalctl -u "$SERVICE_NAME" -n 50 --no-pager || true
  exit 1
}

main() {
  require_command dpkg

  if [[ ! -f "${PROJECT_SRC}/package.json" ]]; then
    echo "Could not find package.json under PROJECT_SRC=${PROJECT_SRC}"
    exit 1
  fi

  log "Starting deployment for ${APP_NAME}"
  install_apt_packages
  install_nodejs
  ensure_runtime_user

  if systemctl list-unit-files | grep -q "^${SERVICE_NAME}.service"; then
    systemctl stop "$SERVICE_NAME" || true
  fi

  sync_project_files
  build_project
  write_env_file
  write_systemd_service
  configure_nginx
  health_check

  echo
  echo "Deployment completed successfully."
  echo "Service: ${SERVICE_NAME}"
  echo "App dir: ${APP_DIR}"
  echo "Port: ${APP_PORT}"
  if [[ "$ENABLE_NGINX" == "1" ]]; then
    echo "Public URL: http://${DOMAIN}"
  else
    echo "Public URL: http://SERVER_IP:${APP_PORT}"
  fi
  echo "Logs: journalctl -u ${SERVICE_NAME} -f"
}

main "$@"
