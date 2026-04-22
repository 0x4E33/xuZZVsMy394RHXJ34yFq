# Ubuntu 24.04 Deployment

在 Ubuntu 24.04 服务器上，把 GitHub 打包文件下载并解压后，进入项目目录执行：

```bash
chmod +x scripts/deploy-ubuntu.sh
sudo bash scripts/deploy-ubuntu.sh
```

常用可选参数：

```bash
sudo DOMAIN=your-domain.com APP_PORT=3000 bash scripts/deploy-ubuntu.sh
```

如果暂时不想装 `nginx`，直接暴露 Node 端口：

```bash
sudo ENABLE_NGINX=0 APP_HOST=0.0.0.0 APP_PORT=3000 bash scripts/deploy-ubuntu.sh
```

如果你希望脚本顺带执行系统包升级：

```bash
sudo APT_UPGRADE=1 bash scripts/deploy-ubuntu.sh
```

脚本会自动完成这些事：

- 执行 `apt-get update`
- 安装 `curl`、`unzip`、`nginx`、`build-essential`、`rsync`
- 检查 Node.js 版本，不满足 `>=20.9.0` 时自动安装 Node.js 22
- 把项目同步到 `/var/www/epay-official-website`
- 执行 `npm ci` 和 `npm run build`
- 处理 Next.js standalone 所需的 `public` 与 `.next/static`
- 创建并启动 `systemd` 服务
- 可选配置 `nginx` 反向代理到 80 端口

部署后常用命令：

```bash
systemctl status epay-official-website
journalctl -u epay-official-website -f
sudo nginx -t
```
