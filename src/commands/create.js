#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

// -----------------------------------------------------------------------------

const DEV_DEPS = [
  'eslint',
  'babel-eslint',
  'eslint-config-prettier',
  'eslint-config-standard',
  'eslint-plugin-react',
  'npm-check-updates'
];

const DEPS = ['react', 'react-dom', 'styled-components'];

// -----------------------------------------------------------------------------

const create = () => {
  console.log('☢️  creating your App...');

  // ---------
  const projectPath = path.resolve(process.cwd(), './');
  const bootPath = path.resolve(
    projectPath,
    '/node_modules/@uralys/reactor/boot'
  );

  // ---------
  console.log(`☢️  copying files to ${chalk.magenta(projectPath)}`);
  shell.cp('-r', `${bootPath}/*`, projectPath);
  shell.cp('-r', `${bootPath}/.*`, projectPath);
  shell.mv(`${projectPath}/.gitignore.to.rename`, `${projectPath}/.gitignore`);

  // ---------
  console.log(`☢️  updating package.json scripts...`);
  const pkgPath = `${projectPath}/package.json`;
  const pkg = require(pkgPath);

  pkg.scripts = {
    prebuild: 'rm -rf ./dist',
    build: 'reactor build',
    'start:dev': 'reactor start',
    ncu: 'npm-check-updates',
    lint: 'eslint src'
  };

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, err => {
    if (err) {
      return console.log('❌', err);
    }
  });

  // ---------
  console.log(`☢️  installing dev deps...`);
  shell.exec(`npm i --save ${DEPS.join(' ')}`);
  shell.exec(`npm i --save-dev ${DEV_DEPS.join(' ')}`);

  // ---------
  console.log('☢️  reactor updated you files successfully.');
  console.log(
    `✅ you can now start your App \n > ${chalk.bold.green(
      'npm run start:dev'
    )}`
  );
};

module.exports = create;
