import chalk from 'chalk';
import esbuild from 'esbuild';
import svgrPlugin from 'esbuild-plugin-svgr';

import handleFileError from '../lib/handle-file-error.js';
import writeMetafile from '../lib/write-metafile.js';
import generateSitemap from './generate-sitemap.js';

// -----------------------------------------------------------------------------

const build = (esbuildConfig, sitemapConfig) => {
  const entry = 'src/index.js';
  const outfile = 'public/app.min.js';

  console.log('☢️  building with esbuild', {outfile});

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
      ...esbuildConfig,
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'globalThis',
        ...esbuildConfig.define
      }
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

      if (sitemapConfig) {
        generateSitemap(sitemapConfig);
      }
    })
    .catch(handleFileError({path: entry}));
};

export default build;
