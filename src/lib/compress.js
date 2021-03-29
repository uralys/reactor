const {createBrotliCompress} = require('zlib');
const {pipeline} = require('stream');
const {createReadStream, createWriteStream, statSync} = require('fs');
const {promisify} = require('util');
const pipe = promisify(pipeline);

const convertBytes = function (bytes) {
  const sizes = ['b', 'kb', 'Mb', 'Gb', 'Tb'];

  if (bytes === 0) {
    return 'n/a';
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  if (i === 0) {
    return bytes + ' ' + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + sizes[i];
};

const compress = async asset => {
  const output = `${asset}.gz`;
  const gzip = createBrotliCompress();
  const source = createReadStream(asset);
  const destination = createWriteStream(output);
  await pipe(source, gzip, destination);

  const stats = statSync(output);

  return {
    output,
    size: convertBytes(stats.size)
  };
};

const brotli = meta => {
  const assets = Object.keys(meta.outputs).filter(
    asset => asset.indexOf('.js.map') === -1
  );

  return Promise.all(assets.map(compress));
};

module.exports = brotli;
