#!/usr/bin/env node

const chalk = require('chalk');
const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const handleFileError = require('../lib/handle-file-error');
const writeMetafile = require('../lib/write-metafile');

const build = esbuildConfig => {
  console.log('☢️  [build] warming up esbuild...');

  const outfile = 'public/app.min.js';
  const entry = 'src/index.js';

  esbuild
    .build({
      entryPoints: [entry],
      minify: true,
      bundle: true,
      metafile: true,
      outfile,
      loader: {
        '.js': 'jsx'
      },
      plugins: [svgrPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'globalThis'
      },
      ...esbuildConfig
    })
    .then(result => {
      if (esbuildConfig.metafile) {
        writeMetafile(result.metafile);
      }

      console.log(`${chalk.green(' ✔ Success')}`);
      const nbBytes = result.metafile.outputs[`${outfile}`].bytes;

      console.log(
        ` ${chalk.cyan('→')} ${chalk
          .hex('#C07CFF')
          .bold(`${outfile}`)} (${nbBytes})`
      );
    })
    .catch(handleFileError({path: entry}));
};

module.exports = build;
