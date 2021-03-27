#!/usr/bin/env node

const yargs = require('yargs');
const pkg = require('../package.json');

const build = require('./build');
const start = require('./start');

const BUILD = 'build';
const START = 'start';
const CREATE = 'create';
const commands = [BUILD, START, CREATE];

const cli = args => {
  const command = argv._[0];
  if (!commands.includes(command)) {
    yargs.showHelp();
    return;
  }

  switch (command) {
    case BUILD: {
      build();
      break;
    }
    case START: {
      start();
      break;
    }
    default: {
      console.log(command);
      console.log('WIP');
    }
  }
};

const msg = `choose one command: [${commands}]`;

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command(BUILD, 'use esbuild to create the distribution files')
  .command(START, 'run the local dev server')
  .command(CREATE, 'bootstrap your React app with initial files')
  .demandCommand(1, 1, msg, msg)
  .help('h')
  .version(pkg.version)
  .alias('version', 'v').argv;

cli(argv);
