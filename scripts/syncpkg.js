#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const archiveDir = path.join(rootDir, 'lib');
const exampleDir = path.join(rootDir, 'example');

const packages = [
  {
    name: '@tryvital/vital-core-react-native',
    dir: path.join(rootDir, 'packages', 'vital-core-react-native'),
  },
  {
    name: '@tryvital/vital-health-react-native',
    dir: path.join(rootDir, 'packages', 'vital-health-react-native'),
  },
  {
    name: '@tryvital/vital-devices-react-native',
    dir: path.join(rootDir, 'packages', 'vital-devices-react-native'),
  },
];

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd ?? rootDir,
    encoding: options.encoding,
    stdio: options.stdio ?? 'inherit',
  });
}

function packWorkspace(pkg) {
  const output = run(
    'npm',
    ['pack', '--json', '--ignore-scripts', '--pack-destination', archiveDir],
    {
      cwd: pkg.dir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    }
  );

  const jsonStart = output.indexOf('[');
  const jsonEnd = output.lastIndexOf(']');

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error(`Unexpected npm pack output for ${pkg.name}`);
  }

  const result = JSON.parse(output.slice(jsonStart, jsonEnd + 1));
  const archive = result[0];

  if (!archive || archive.name !== pkg.name || !archive.filename) {
    throw new Error(`Unexpected npm pack output for ${pkg.name}`);
  }

  return archive;
}

function addArchiveInfix(filename, version, infix) {
  const versionSuffix = `-${version}.tgz`;

  if (filename.endsWith(versionSuffix)) {
    return filename.slice(0, -versionSuffix.length) + `-${infix}${versionSuffix}`;
  }

  return filename.replace(/\.tgz$/, `-${infix}.tgz`);
}

function main() {
  const archiveInfix = crypto.randomBytes(4).toString('hex');

  fs.rmSync(archiveDir, { recursive: true, force: true });
  fs.mkdirSync(archiveDir, { recursive: true });

  run('yarn', ['workspaces', 'run', 'build']);

  const specs = packages.map((pkg) => {
    const archive = packWorkspace(pkg);
    const archivePath = path.join(archiveDir, archive.filename);
    const renamedArchivePath = path.join(
      archiveDir,
      addArchiveInfix(archive.filename, archive.version, archiveInfix)
    );

    fs.renameSync(archivePath, renamedArchivePath);

    const relativeArchivePath = toPosixPath(
      path.relative(exampleDir, renamedArchivePath)
    );
    return `file:${relativeArchivePath}`;
  });

  run('yarn', ['--cwd', exampleDir, 'remove', ...packages.map((pkg) => pkg.name)]);
  run('yarn', ['--cwd', exampleDir, 'add', ...specs, '--check-files']);
}

main();
