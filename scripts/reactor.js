#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const yargs = require('yargs');

const pkg = require('../package.json');

const build = require('../src/build');
const create = require('../src/create');
const generateTOC = require('../src/generate-toc');
const start = require('../src/start');

// -----------------------------------------------------------------------------

const BUILD = 'build';
const START = 'start';
const CREATE = 'create';
const TOC = 'toc';
const commands = [BUILD, START, CREATE, TOC];
const commandMessage = `choose one command: [${commands}]`;

// -----------------------------------------------------------------------------

const CONFIG_FILE = 'reactor.config.js';

// -----------------------------------------------------------------------------

const getAdditionalConfig = () => {
  let additionalConfig;

  try {
    const configPath = path.resolve(process.cwd(), `./${CONFIG_FILE}`);
    additionalConfig = require(configPath);
  } catch (e) {}

  if (!additionalConfig) {
    console.log(
      chalk.yellow(`No file "${CONFIG_FILE}" was found\nUsing default setup.`)
    );

    return {esbuildConfig: {}, documentationConfig: {}};
  }

  return {
    esbuildConfig: additionalConfig.esbuild,
    documentationConfig: additionalConfig.documentation
  };
};

// -----------------------------------------------------------------------------

const reactor = args => {
  const command = argv._[0];
  if (!commands.includes(command)) {
    yargs.showHelp();
    return;
  }

  switch (command) {
    case BUILD: {
      const {esbuildConfig} = getAdditionalConfig();
      build(esbuildConfig);
      break;
    }
    case START: {
      const {esbuildConfig} = getAdditionalConfig();
      start(esbuildConfig);
      break;
    }
    case TOC: {
      const {documentationConfig} = getAdditionalConfig();
      generateTOC(documentationConfig);
      break;
    }
    case CREATE: {
      create();
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
  .command(TOC, 'generate TOC for your documentation from your markdown files')
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
