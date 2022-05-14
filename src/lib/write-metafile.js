import fs from 'fs';

const output = 'meta.json';

export default metafile => {
  console.log(`☢️  exporting metafile in ${output}`);
  try {
    fs.writeFileSync(output, JSON.stringify(metafile));
  } catch (e) {
    console.log(e);
  }
};
