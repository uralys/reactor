import {readFile} from 'fs/promises';

const readJSON = async path => {
  const json = JSON.parse(await readFile(path));

  return json;
};

export default readJSON;
