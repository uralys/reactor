const fs = require('fs');
const output = 'meta.json';

module.exports = metafile => {
  console.log(`☢️  exporting metafile in ${output}`);
  try {
    fs.writeFileSync(output, JSON.stringify(metafile));
  } catch (e) {
    console.log(e);
  }
};
