import {readFile} from 'fs/promises';

const readJSON = async path => {
  const json = JSON.parse(await readFile(new URL(path, import.meta.url)));

  return json;
};

export default readJSON;
