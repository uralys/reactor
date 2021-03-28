#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const shell = require('shelljs');

const create = additionalConfig => {
  console.log('☢️  creating your App...');

  const projectPath = path.resolve(process.cwd(), './');
  const bootPath = path.resolve(__dirname, '../boot');
  console.log(`copying files to ${chalk.magenta(projectPath)}`);
  shell.ls('-Al', `${bootPath}/*`).forEach(console.log);
  // shell.cp('-r', `${bootPath}/*`, projectPath);
};

module.exports = create;

// // Copy files to release dir
// shell.rm('-rf', 'out/Release');
// shell.cp('-R', 'stuff/', 'out/Release');
