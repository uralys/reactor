#!/usr/bin/env node

import chalk from 'chalk';
import {readFile} from 'fs/promises';
import path from 'path';
import yargs from 'yargs';

import build from './commands/build.js';
import create from './commands/create.js';
import generateTOC from './commands/generate-toc.js';
import start from './commands/start.js';

import {fileURLToPath} from 'url';
import process from 'process';

// -----------------------------------------------------------------------------

const DOCUMENTATION_URL =
  'https://github.com/uralys/reactor/blob/master/readme.md';

// -----------------------------------------------------------------------------

const pkg = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url))
);

// const pplop = require('../package.json');

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

    return {
      esbuildConfig: {},
      documentationConfig: {},
      startConfig: undefined,
      sitemap: undefined
    };
  }

  return {
    prebuild: additionalConfig.prebuild,
    esbuildConfig: additionalConfig.esbuild,
    documentationConfig: additionalConfig.documentation,
    sitemapConfig: additionalConfig.sitemap,
    startConfig: additionalConfig.start
  };
};

// -----------------------------------------------------------------------------

const reactor = argv => {
  const command = argv._[0];
  if (!commands.includes(command)) {
    return false;
  }

  switch (command) {
    case BUILD: {
      const {
        prebuild = null,
        esbuildConfig,
        sitemapConfig
      } = getAdditionalConfig();
      if (prebuild) {
        prebuild();
      }

      build(esbuildConfig, sitemapConfig);
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
      console.log('🔴 not handled');
    }
  }

  return true;
};

// -----------------------------------------------------------------------------

const createCLI = cliParams => {
  const cli = yargs(cliParams);

  cli
    .usage('Usage: $0 <command> [options]')
    .command(BUILD, 'use esbuild to create the distribution files')
    .command(START, 'run the local dev server')
    .command(CREATE, 'bootstrap your React app with initial files')
    .command(
      TOC,
      'generate TOC for your documentation from your markdown files'
    )
    .demandCommand(1, 1, commandMessage, commandMessage)
    .help('h')
    .version(pkg.version)
    .alias('version', 'v')
    .epilog(
      `${chalk.bold.green(
        `Reactor v${pkg.version}`
      )}\nDocumentation on ${DOCUMENTATION_URL}`
    );

  return cli;
};

// -----------------------------------------------------------------------------
// binary run:

// https://stackoverflow.com/a/60309682/959219
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cliParams = process.argv.slice(2);
  const cli = createCLI(cliParams);
  const success = reactor(cli.argv);

  if (!success) {
    console.log('--------<<<< showhelp');
    cli.showHelp();
  }
}

// -----------------------------------------------------------------------------
// exporting for testing purposes:

export default reactor;
export {BUILD, createCLI};
