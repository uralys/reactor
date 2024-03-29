import chalk from 'chalk';
import esbuild from 'esbuild';
import liveServer from '@compodoc/live-server';
import historyApiFallback from 'connect-history-api-fallback';
import svgrPlugin from 'esbuild-plugin-svgr';

import handleFileError from '../lib/handle-file-error.js';
import writeMetafile from '../lib/write-metafile.js';

// -----------------------------------------------------------------------------

const PUBLIC = 'public';
const entry = 'src/index.js';

// -----------------------------------------------------------------------------

const start = (esbuildConfig = {}, startConfig = {hosts: ['localhost']}) => {
  console.log('☢️  building with esbuild');

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
      ...esbuildConfig,
      define: {
        'process.env.NODE_ENV': '"development"',
        global: 'globalThis',
        ...esbuildConfig.define
      }
    })
    .then(result => {
      if (esbuildConfig.metafile) {
        writeMetafile(result.metafile);
      }
      console.log(`${chalk.green(' ✔ Success')}`);
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

export default start;
