const chalk = require('chalk');
const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const pkg = require('../package.json');
const brotli = require('./compress');

const DIST = 'dist';
const bundleName = `app-${pkg.version}`;

const banner = `/**
 * BUNDLED with esbuild
 * (c) 2020 Evan Wallace
 * https://github.com/evanw/esbuild
 * @license MIT
 */
`;

const resultMessage = (results, metafile) => {
  console.log(`${chalk.green(' ✔ Success')}`);

  results.forEach(({output, size}) => {
    console.log(
      `   ${chalk.cyan('→')} ${chalk.hex('#D07CFF').bold(`${output}`)} ${
        size ? chalk.yellow(size) : ''
      }`
    );
  });

  console.log(`   (${chalk.hex('#ffddFd')(`${metafile}`)})`);
  console.log(' ');
};

const buildApp = ({format, minify, compress}) => {
  const MODE = minify ? 'min' : 'debug';
  const outfile = `${DIST}/${MODE}/${bundleName}.${MODE}.js`;
  const metafile = `${DIST}/meta/meta-${MODE}.json`;

  esbuild
    .build({
      banner,
      format,
      minify,
      entryPoints: ['src/index.js'],
      bundle: true,
      sourcemap: true,
      metafile,
      outfile,
      loader: {'.js': 'jsx'},
      plugins: [svgrPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    })
    .then(() => {
      if (compress) {
        brotli(metafile).then(results => {
          resultMessage(results, metafile);
        });
      } else {
        resultMessage([{output: outfile}], metafile);
      }
    })
    .catch(() => process.exit(1));
};

const formats = [
  {format: 'cjs', minify: true, compress: true},
  {format: 'cjs', minify: false, compress: false}
];

formats.forEach(buildApp);
