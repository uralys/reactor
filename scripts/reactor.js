#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const yargs = require('yargs');

const pkg = require('../package.json');

const build = require('../src/build');
const start = require('../src/start');

// -----------------------------------------------------------------------------

const BUILD = 'build';
const START = 'start';
const CREATE = 'create';
const commands = [BUILD, START, CREATE];
const commandMessage = `choose one command: [${commands}]`;

// -----------------------------------------------------------------------------

const CONFIG_FILE = 'reactor.config.js';

// -----------------------------------------------------------------------------

const getAdditionalConfig = () => {
  let additionalConfig;
  try {
    additionalConfig = require(path.resolve(process.cwd(), `./${CONFIG_FILE}`));
  } catch (e) {}

  if (!additionalConfig) {
    console.log(
      chalk.yellow(`No file "${CONFIG_FILE}" was found\nUsing default setup.`)
    );
  }

  return additionalConfig;
};

// -----------------------------------------------------------------------------

const reactor = args => {
  console.log(chalk.bold.green(`Reactor v${pkg.version}`));

  const command = argv._[0];
  if (!commands.includes(command)) {
    yargs.showHelp();
    return;
  }

  console.log(`${chalk.bold.green(`Reactor v${pkg.version}`)}/${command}`);
  const additionalConfig = getAdditionalConfig();

  switch (command) {
    case BUILD: {
      build(additionalConfig);
      break;
    }
    case START: {
      start(additionalConfig);
      break;
    }
    default: {
      console.log(command);
      console.log('WIP');
    }
  }
};

// -----------------------------------------------------------------------------

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command(BUILD, 'use esbuild to create the distribution files')
  .command(START, 'run the local dev server')
  .command(CREATE, 'bootstrap your React app with initial files')
  .demandCommand(1, 1, commandMessage, commandMessage)
  .help('h')
  .version(pkg.version)
  .alias('version', 'v')
  .epilog(
    `${chalk.bold.green(
      `Reactor v${pkg.version}`
    )}\nDocumentation on https://reactor.uralys.com`
  ).argv;

// -----------------------------------------------------------------------------

reactor(argv);
