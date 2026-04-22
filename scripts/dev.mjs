import {execFileSync, spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const PORT = '3000';
const DEV_OUTPUT_DIR = path.join(PROJECT_ROOT, '.next', 'dev');

function run(command, args) {
  try {
    return execFileSync(command, args, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    return '';
  }
}

function getListeningPids(port) {
  const output = run('lsof', ['-tiTCP:' + port, '-sTCP:LISTEN']);
  return output ? output.split('\n').map((value) => value.trim()).filter(Boolean) : [];
}

function getProcessCwd(pid) {
  const output = run('lsof', ['-a', '-p', pid, '-d', 'cwd', '-Fn']);
  const cwdLine = output.split('\n').find((line) => line.startsWith('n'));
  return cwdLine ? cwdLine.slice(1) : '';
}

function isProcessAlive(pid) {
  const output = run('lsof', ['-p', pid, '-Fn']);
  return output.length > 0;
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function waitForPortToClear(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (getListeningPids(PORT).length === 0) {
      return true;
    }
    sleep(100);
  }
  return getListeningPids(PORT).length === 0;
}

function stopStaleProjectDevServer() {
  const pids = getListeningPids(PORT);
  if (pids.length === 0) {
    return;
  }

  const sameProjectPids = pids.filter((pid) => getProcessCwd(pid) === PROJECT_ROOT);
  if (sameProjectPids.length !== pids.length) {
    console.error(`Port ${PORT} is already in use by another process. Stop it first or use a different port.`);
    process.exit(1);
  }

  for (const pid of sameProjectPids) {
    process.kill(Number(pid), 'SIGTERM');
  }

  if (waitForPortToClear(3000)) {
    return;
  }

  for (const pid of sameProjectPids) {
    if (isProcessAlive(pid)) {
      process.kill(Number(pid), 'SIGKILL');
    }
  }

  if (!waitForPortToClear(3000)) {
    console.error(`Could not free port ${PORT} from an earlier dev server in this project.`);
    process.exit(1);
  }
}

stopStaleProjectDevServer();
fs.rmSync(DEV_OUTPUT_DIR, {recursive: true, force: true});

const nextBin = path.join(PROJECT_ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
const child = spawn(process.execPath, [nextBin, 'dev', '--webpack', '--port', PORT], {
  cwd: PROJECT_ROOT,
  stdio: 'inherit',
  env: process.env
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
