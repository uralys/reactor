#!/usr/bin/env node

const chalk = require('chalk');
const esbuild = require('esbuild');
const liveServer = require('live-server');
const historyApiFallback = require('connect-history-api-fallback');
const svgrPlugin = require('esbuild-plugin-svgr');
const handleFileError = require('../lib/handle-file-error');

const PUBLIC = 'public';
const entry = 'src/index.js';

const start = (esbuildConfig = {}, startConfig = {hosts: ['localhost']}) => {
  console.log('☢️  [start] warming up esbuild...');

  esbuild
    .build({
      entryPoints: [entry],
      outfile: 'public/app.min.js',
      format: 'cjs',
      loader: {
        '.js': 'jsx'
      },
      bundle: true,
      sourcemap: true,
      watch: true,
      plugins: [svgrPlugin()],
      define: {
        'process.env.NODE_ENV': '"development"',
        global: 'globalThis'
      },
      ...esbuildConfig
    })
    .then(result => {
      console.log('\n☢️  server running:');

      startConfig.hosts.map(host =>
        console.log(chalk.bold.blue(`  - http://${host}:8080`))
      );
      console.log(' ');

      liveServer.start({
        root: PUBLIC,
        open: false,
        middleware: [historyApiFallback()]
      });
    })
    .catch(handleFileError({path: entry}));
};

module.exports = start;
