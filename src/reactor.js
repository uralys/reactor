#!/usr/bin/env node
// -----------------------------------------------------------------------------

import chalk from 'chalk';
import path from 'path';
import yargs from 'yargs';

import build from './commands/build.js';
import create from './commands/create.js';
import generateTOC from './commands/generate-toc.js';
import start from './commands/start.js';
import readJSON from './lib/read-json.js';

// -----------------------------------------------------------------------------

const DOCUMENTATION_URL =
  'https://github.com/uralys/reactor/blob/master/readme.md';

// -----------------------------------------------------------------------------

const pkg = readJSON('../package.json');

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

const getAdditionalConfig = async () => {
  let additionalConfig;

  try {
    const configPath = path.resolve(process.cwd(), `./${CONFIG_FILE}`);
    additionalConfig = await import(configPath);
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

const reactor = async argv => {
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
      } = await getAdditionalConfig();
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
      } = await getAdditionalConfig();
      if (prebuild) {
        prebuild();
      }

      start(esbuildConfig, startConfig);
      break;
    }
    case TOC: {
      const {documentationConfig} = await getAdditionalConfig();
      generateTOC(documentationConfig);
      break;
    }
    case CREATE: {
      await create();
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
// binary runner

const isReactorRunner = () => {
  const splitters = process.argv[1].split('/');
  return splitters[splitters.length - 1].indexOf('reactor') !== -1;
};

const run = async () => {
  const cliParams = process.argv.slice(2);
  const cli = createCLI(cliParams);
  const success = await reactor(cli.argv);

  if (!success) {
    cli.showHelp();
  }
};

if (isReactorRunner()) {
  run();
}

// -----------------------------------------------------------------------------
// exporting for testing purposes

export default reactor;
export {BUILD, createCLI};
