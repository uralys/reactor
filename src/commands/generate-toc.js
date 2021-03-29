const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const transform = require('doctoc/lib/transform');

const handleFileError = require('../lib/handle-file-error');

// -----------------------------------------------------------------------------

const TOC_HEADER =
  '**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*\n\n';

// -----------------------------------------------------------------------------

const clean = distPath => {
  rimraf.sync(distPath, {rmdir: true});
  mkdirp.sync(distPath);
};

// -----------------------------------------------------------------------------

const generate = (sourcePath, distPath) => {
  let topics = [];

  try {
    topics = fs.readdirSync(sourcePath);
  } catch (e) {
    console.log(chalk.red.bold(e.message));
    handleFileError({path: sourcePath})(e);
    process.exit(0);
  }

  topics.map(extractTOC(sourcePath, distPath));
};

// -----------------------------------------------------------------------------

const extractTOC = (sourcePath, distPath) => fileName => {
  if (fileName.indexOf('.md') === -1) {
    return;
  }

  const mdPath = `${sourcePath}/${fileName}`;

  let md;
  try {
    md = fs.readFileSync(mdPath, 'utf8');
  } catch (e) {
    return;
  }

  const outputName = `toc.${fileName}`;
  console.log(chalk.bold.green(`> tocs/${outputName}`));

  const extraction = transform(md);

  let toc = extraction.toc.split(TOC_HEADER)[1];
  const topNav = toc.split('\n')[0];

  toc = toc.split(`${topNav}\n`)[1];
  console.log(toc);

  const outputPath = `${distPath}/${outputName}`;

  fs.writeFile(outputPath, toc, err => {
    if (err) {
      return console.log('❌', err);
    }
  });
};

// -----------------------------------------------------------------------------

const generateTOC = (documentationConfig = {}) => {
  console.log(`☢️  Generating TOC...\n`);
  const {source = './src/pages/docs', dist = './tocs'} = documentationConfig;

  const distPath = path.resolve(process.cwd(), dist);
  const sourcePath = path.resolve(process.cwd(), source);

  clean(distPath);
  generate(sourcePath, distPath);

  console.log(`☢️  please wait for files...\n`);
};

// -----------------------------------------------------------------------------

module.exports = generateTOC;
