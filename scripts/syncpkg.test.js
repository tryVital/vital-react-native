const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const test = require('node:test');

const managedPackages = [
  '@tryvital/vital-core-react-native',
  '@tryvital/vital-health-react-native',
  '@tryvital/vital-devices-react-native',
];

const packageVersion = '6.0.0-rc.1';
const scriptSourcePath = path.resolve(__dirname, 'syncpkg.js');

function archivePrefixForPackage(packageName) {
  return `${packageName.replace(/^@/, '').replace(/\//g, '-')}-`;
}

function archiveFilename(packageName, version, infix) {
  return `${archivePrefixForPackage(packageName)}${infix}-${version}.tgz`;
}

function createExamplePackageJson(managedDependencies) {
  return {
    name: 'example',
    version: '0.0.1',
    dependencies: {
      ...managedDependencies,
      '@tryvital/vital-node': '^3.1.544',
    },
  };
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function listArchives(rootDir) {
  return fs
    .readdirSync(path.join(rootDir, 'lib'))
    .filter((filename) => filename.endsWith('.tgz'))
    .sort();
}

function readManagedDependencies(rootDir) {
  const examplePackageJson = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'example', 'package.json'), 'utf8')
  );

  return Object.fromEntries(
    Object.entries(examplePackageJson.dependencies).filter(([name]) =>
      managedPackages.includes(name)
    )
  );
}

function readExamplePackageJson(rootDir) {
  return JSON.parse(
    fs.readFileSync(path.join(rootDir, 'example', 'package.json'), 'utf8')
  );
}

function runSyncpkg(rootDir, extraEnv = {}) {
  const binDir = path.join(rootDir, 'bin');
  const result = spawnSync(process.execPath, ['scripts/syncpkg.js'], {
    cwd: rootDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...extraEnv,
      PATH: `${binDir}${path.delimiter}${process.env.PATH || ''}`,
    },
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
    throw new Error(output || `syncpkg exited with status ${result.status}`);
  }
}

function runSyncpkgExpectFailure(rootDir, extraEnv = {}) {
  const binDir = path.join(rootDir, 'bin');
  return spawnSync(process.execPath, ['scripts/syncpkg.js'], {
    cwd: rootDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...extraEnv,
      PATH: `${binDir}${path.delimiter}${process.env.PATH || ''}`,
    },
  });
}

function createFixture(options = {}) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'syncpkg-test-'));
  const scriptsDir = path.join(rootDir, 'scripts');
  const exampleDir = path.join(rootDir, 'example');
  const archiveDir = path.join(rootDir, 'lib');
  const binDir = path.join(rootDir, 'bin');

  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.mkdirSync(exampleDir, { recursive: true });
  fs.mkdirSync(archiveDir, { recursive: true });
  fs.mkdirSync(binDir, { recursive: true });

  fs.copyFileSync(scriptSourcePath, path.join(scriptsDir, 'syncpkg.js'));

  for (const packageName of managedPackages) {
    const packageDir = path.join(rootDir, 'packages', packageName.split('/')[1]);
    fs.mkdirSync(packageDir, { recursive: true });
    writeJson(path.join(packageDir, 'package.json'), {
      name: packageName,
      version: packageVersion,
      ...(options.managedPackageJsonOverrides?.[packageName] ?? {}),
    });
  }

  writeJson(
    path.join(exampleDir, 'package.json'),
    options.examplePackageJson ?? createExamplePackageJson({})
  );
  fs.writeFileSync(
    path.join(exampleDir, 'yarn.lock'),
    options.exampleLockfile ?? 'initial-lockfile\n'
  );

  for (const filename of options.initialArchives ?? []) {
    fs.writeFileSync(path.join(archiveDir, filename), filename);
  }

  const fakeNpmPath = path.join(binDir, 'npm');
  fs.writeFileSync(
    fakeNpmPath,
    `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const destination = args[args.indexOf('--pack-destination') + 1];
const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
);
const filename = \`\${packageJson.name.replace(/^@/, '').replace(/\\//g, '-')}-\${packageJson.version}.tgz\`;

fs.mkdirSync(destination, { recursive: true });
fs.writeFileSync(path.join(destination, filename), packageJson.name);
process.stdout.write(
  JSON.stringify([
    {
      name: packageJson.name,
      version: packageJson.version,
      filename,
    },
  ])
);
`
  );
  fs.chmodSync(fakeNpmPath, 0o755);

  const fakeYarnPath = path.join(binDir, 'yarn');
  fs.writeFileSync(
    fakeYarnPath,
    `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const managedPackages = ${JSON.stringify(managedPackages)};

function archivePrefixForPackage(packageName) {
  return \`\${packageName.replace(/^@/, '').replace(/\\//g, '-')}-\`;
}

function packageNameForSpec(spec) {
  const filename = path.basename(spec.replace(/^file:/, ''));
  const packageName = managedPackages.find((candidate) =>
    filename.startsWith(archivePrefixForPackage(candidate))
  );

  if (!packageName) {
    throw new Error(\`Unknown package spec: \${spec}\`);
  }

  return packageName;
}

function readPackageJson(rootDir, packageName) {
  return JSON.parse(
    fs.readFileSync(
      path.join(rootDir, 'packages', packageName.split('/')[1], 'package.json'),
      'utf8'
    )
  );
}

const args = process.argv.slice(2);

if (args[0] === 'workspaces' && args[1] === 'run' && args[2] === 'build') {
  process.exit(0);
}

if (args[0] === '--cwd' && args.includes('add')) {
  const exampleDir = args[1];
  const addIndex = args.indexOf('add');
  const specs = args.slice(addIndex + 1).filter(
    (arg) => arg !== '--check-files' && arg !== '--non-interactive'
  );
  const packageJsonPath = path.join(exampleDir, 'package.json');
  const yarnLockPath = path.join(exampleDir, 'yarn.lock');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const rootDir = path.resolve(exampleDir, '..');
  const specByPackageName = Object.fromEntries(
    specs.map((spec) => [packageNameForSpec(spec), spec])
  );

  packageJson.dependencies = packageJson.dependencies || {};

  for (const packageName of managedPackages) {
    const managedPackageJson = readPackageJson(rootDir, packageName);

    for (const dependencyName of Object.keys(managedPackageJson.dependencies || {})) {
      if (!managedPackages.includes(dependencyName)) {
        continue;
      }

      if (packageJson.resolutions?.[dependencyName] !== specByPackageName[dependencyName]) {
        process.stderr.write(\`Missing managed resolution for \${dependencyName}\\n\`);
        process.exit(1);
      }
    }
  }

  for (const spec of specs) {
    packageJson.dependencies[packageNameForSpec(spec)] = spec;
  }

  fs.writeFileSync(packageJsonPath, \`\${JSON.stringify(packageJson, null, 2)}\\n\`);
  fs.writeFileSync(yarnLockPath, \`managed:\${specs.join(',')}\\n\`);

  if (process.env.FAIL_AFTER_WRITE === '1') {
    process.stderr.write('simulated yarn add failure\\n');
    process.exit(1);
  }

  process.exit(0);
}

process.stderr.write(\`Unexpected yarn invocation: \${args.join(' ')}\\n\`);
process.exit(1);
`
  );
  fs.chmodSync(fakeYarnPath, 0o755);

  return rootDir;
}

test('syncpkg recovers from a prior failed remove state and stays repeatable', (t) => {
  const rootDir = createFixture({
    examplePackageJson: createExamplePackageJson({}),
  });

  t.after(() => {
    fs.rmSync(rootDir, { recursive: true, force: true });
  });

  runSyncpkg(rootDir);
  const firstDependencies = readManagedDependencies(rootDir);
  const firstArchives = listArchives(rootDir);

  assert.deepStrictEqual(Object.keys(firstDependencies).sort(), managedPackages.slice().sort());
  assert.strictEqual(firstArchives.length, managedPackages.length);

  runSyncpkg(rootDir);
  const secondDependencies = readManagedDependencies(rootDir);
  const secondArchives = listArchives(rootDir);

  assert.deepStrictEqual(Object.keys(secondDependencies).sort(), managedPackages.slice().sort());
  assert.strictEqual(secondArchives.length, managedPackages.length);
  assert.notDeepStrictEqual(secondDependencies, firstDependencies);
});

test('syncpkg restores example manifests after a failed add and succeeds on retry', (t) => {
  const oldManagedDependencies = Object.fromEntries(
    managedPackages.map((packageName) => [
      packageName,
      `file:../lib/${archiveFilename(packageName, '5.5.0', 'previous')}`,
    ])
  );
  const initialArchives = managedPackages.map((packageName) =>
    archiveFilename(packageName, '5.5.0', 'previous')
  );
  const rootDir = createFixture({
    examplePackageJson: createExamplePackageJson(oldManagedDependencies),
    exampleLockfile: 'previous-lockfile\n',
    initialArchives,
  });

  t.after(() => {
    fs.rmSync(rootDir, { recursive: true, force: true });
  });

  const initialPackageJson = fs.readFileSync(
    path.join(rootDir, 'example', 'package.json'),
    'utf8'
  );
  const initialLockfile = fs.readFileSync(
    path.join(rootDir, 'example', 'yarn.lock'),
    'utf8'
  );

  const failedRun = runSyncpkgExpectFailure(rootDir, { FAIL_AFTER_WRITE: '1' });
  assert.notStrictEqual(failedRun.status, 0);
  assert.strictEqual(
    fs.readFileSync(path.join(rootDir, 'example', 'package.json'), 'utf8'),
    initialPackageJson
  );
  assert.strictEqual(
    fs.readFileSync(path.join(rootDir, 'example', 'yarn.lock'), 'utf8'),
    initialLockfile
  );

  for (const filename of initialArchives) {
    assert.ok(fs.existsSync(path.join(rootDir, 'lib', filename)));
  }

  runSyncpkg(rootDir);

  const finalDependencies = readManagedDependencies(rootDir);
  const finalArchives = listArchives(rootDir);

  assert.deepStrictEqual(Object.keys(finalDependencies).sort(), managedPackages.slice().sort());
  assert.strictEqual(finalArchives.length, managedPackages.length);
  assert.ok(
    Object.values(finalDependencies).every(
      (spec) => spec.startsWith('file:../lib/') && spec.includes(packageVersion)
    )
  );
});

test('syncpkg pins managed internal dependencies through example resolutions', (t) => {
  const rootDir = createFixture({
    examplePackageJson: {
      ...createExamplePackageJson({}),
      resolutions: {
        leftPad: '1.3.0',
      },
    },
    managedPackageJsonOverrides: {
      '@tryvital/vital-health-react-native': {
        dependencies: {
          '@tryvital/vital-core-react-native': packageVersion,
        },
      },
      '@tryvital/vital-devices-react-native': {
        dependencies: {
          '@tryvital/vital-core-react-native': packageVersion,
        },
      },
    },
  });

  t.after(() => {
    fs.rmSync(rootDir, { recursive: true, force: true });
  });

  runSyncpkg(rootDir);

  const examplePackageJson = readExamplePackageJson(rootDir);

  assert.strictEqual(
    examplePackageJson.resolutions.leftPad,
    '1.3.0'
  );
  assert.strictEqual(
    examplePackageJson.resolutions['@tryvital/vital-core-react-native'],
    examplePackageJson.dependencies['@tryvital/vital-core-react-native']
  );
});
