#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const archiveDir = path.join(rootDir, 'lib');
const exampleDir = path.join(rootDir, 'example');
const examplePackageJsonPath = path.join(exampleDir, 'package.json');
const exampleLockfilePath = path.join(exampleDir, 'yarn.lock');
const npmCacheDir =
  process.env.NPM_CONFIG_CACHE ??
  path.join(os.tmpdir(), 'vital-react-native-npm-cache');

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
    env: {
      ...process.env,
      ...(options.env ?? {}),
    },
    stdio: options.stdio ?? 'inherit',
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function packWorkspace(pkg) {
  const output = run(
    'npm',
    ['pack', '--json', '--ignore-scripts', '--pack-destination', archiveDir],
    {
      cwd: pkg.dir,
      encoding: 'utf8',
      env: {
        NPM_CONFIG_CACHE: npmCacheDir,
      },
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

function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf8');
}

function restoreFile(filePath, contents) {
  if (contents === null) {
    fs.rmSync(filePath, { force: true });
    return;
  }

  fs.writeFileSync(filePath, contents);
}

function archivePrefixForPackage(packageName) {
  return `${packageName.replace(/^@/, '').replace(/\//g, '-')}-`;
}

function managedPackageNames() {
  return new Set(packages.map((pkg) => pkg.name));
}

function managedDependencyPackageNames() {
  const names = managedPackageNames();
  const dependencyNames = new Set();

  for (const pkg of packages) {
    const packageJson = readJson(path.join(pkg.dir, 'package.json'));

    for (const dependencyGroup of [
      packageJson.dependencies,
      packageJson.optionalDependencies,
    ]) {
      for (const dependencyName of Object.keys(dependencyGroup ?? {})) {
        if (names.has(dependencyName)) {
          dependencyNames.add(dependencyName);
        }
      }
    }
  }

  return dependencyNames;
}

function syncExampleResolutions(specByPackageName) {
  const examplePackageJson = readJson(examplePackageJsonPath);
  const nextResolutions = { ...(examplePackageJson.resolutions ?? {}) };

  for (const packageName of managedPackageNames()) {
    delete nextResolutions[packageName];
  }

  for (const packageName of managedDependencyPackageNames()) {
    nextResolutions[packageName] = specByPackageName[packageName];
  }

  if (Object.keys(nextResolutions).length === 0) {
    delete examplePackageJson.resolutions;
  } else {
    examplePackageJson.resolutions = nextResolutions;
  }

  writeJson(examplePackageJsonPath, examplePackageJson);
}

function cleanupStaleArchives(currentArchiveFilenames) {
  const keep = new Set(currentArchiveFilenames);

  for (const entry of fs.readdirSync(archiveDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.tgz') || keep.has(entry.name)) {
      continue;
    }

    if (!packages.some((pkg) => entry.name.startsWith(archivePrefixForPackage(pkg.name)))) {
      continue;
    }

    fs.rmSync(path.join(archiveDir, entry.name), { force: true });
  }
}

function main() {
  const archiveInfix = crypto.randomBytes(4).toString('hex');
  const examplePackageJson = readFileIfExists(examplePackageJsonPath);
  const exampleLockfile = readFileIfExists(exampleLockfilePath);

  fs.mkdirSync(archiveDir, { recursive: true });

  run('yarn', ['workspaces', 'run', 'build']);

  const currentArchiveFilenames = [];
  const specs = packages.map((pkg) => {
    const archive = packWorkspace(pkg);
    const archivePath = path.join(archiveDir, archive.filename);
    const renamedArchivePath = path.join(
      archiveDir,
      addArchiveInfix(archive.filename, archive.version, archiveInfix)
    );

    fs.renameSync(archivePath, renamedArchivePath);
    currentArchiveFilenames.push(path.basename(renamedArchivePath));

    const relativeArchivePath = toPosixPath(
      path.relative(exampleDir, renamedArchivePath)
    );
    return `file:${relativeArchivePath}`;
  });

  const specByPackageName = Object.fromEntries(
    packages.map((pkg, index) => [pkg.name, specs[index]])
  );

  try {
    syncExampleResolutions(specByPackageName);
    run('yarn', [
      '--cwd',
      exampleDir,
      '--non-interactive',
      'add',
      ...specs,
      '--check-files',
    ]);
  } catch (error) {
    restoreFile(examplePackageJsonPath, examplePackageJson);
    restoreFile(exampleLockfilePath, exampleLockfile);
    throw error;
  }

  cleanupStaleArchives(currentArchiveFilenames);
}

main();
