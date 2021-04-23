#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const yargs = require('yargs');

const pkg = require('../package.json');

const build = require('./commands/build');
const create = require('./commands/create');
const generateTOC = require('./commands/generate-toc');
const start = require('./commands/start');

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

    return {esbuildConfig: {}, documentationConfig: {}, startConfig: undefined};
  }

  return {
    prebuild: additionalConfig.prebuild,
    esbuildConfig: additionalConfig.esbuild,
    documentationConfig: additionalConfig.documentation,
    startConfig: additionalConfig.start
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
      const {prebuild = null, esbuildConfig} = getAdditionalConfig();
      if (prebuild) {
        prebuild();
      }

      build(esbuildConfig);
      break;
    }
    case START: {
      const {
        prebuild = null,
        esbuildConfig,
        startConfig
      } = getAdditionalConfig();
      if (prebuild) {
        prebuild();
      }

      start(esbuildConfig, startConfig);
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
