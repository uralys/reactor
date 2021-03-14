const chalk = require('chalk');
const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const brotli = require('./compress');

const DIST = 'dist';
const bundleName = `app`;

const banner = `/**
 * BUNDLED with esbuild
 * (c) 2020 Evan Wallace
 * https://github.com/evanw/esbuild
 * @license MIT
 */
`;

const resultMessage = results => {
  console.log(`${chalk.green(' ✔ Success')}`);

  results.forEach(({output, size}) => {
    console.log(
      `   ${chalk.cyan('→')} ${chalk.hex('#D07CFF').bold(`${output}`)} ${
        size ? chalk.yellow(size) : ''
      }`
    );
  });

  console.log(' ');
};

const buildApp = ({format, minify, compress}) => {
  const MODE = minify ? 'min' : 'debug';
  const outfile = `${DIST}/${MODE}/${bundleName}.${MODE}.js`;

  esbuild
    .build({
      banner: {js: banner},
      format,
      minify,
      entryPoints: ['src/index.js'],
      bundle: true,
      sourcemap: true,
      metafile: true,
      outfile,
      loader: {'.js': 'jsx'},
      plugins: [svgrPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'globalThis'
      }
    })
    .then(result => {
      const metafile = result.metafile;
      if (compress) {
        brotli(metafile).then(results => {
          resultMessage(results);
        });
      } else {
        resultMessage([{output: outfile}]);
      }
    })
    .catch(() => process.exit(1));
};

const formats = [
  {format: 'cjs', minify: true, compress: true},
  {format: 'cjs', minify: false, compress: false}
];

formats.forEach(buildApp);
