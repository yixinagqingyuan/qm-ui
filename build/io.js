const fs = require('fs').promises;
const path = require('path');
const root = path.resolve(__dirname, '..');
module.exports = {
  readFile: (path) => {
    return fs.readFile(`${root}/${path}`, { encoding: 'utf8' });
  },
  writeFile: (path, content) => {
    return fs.writeFile(`${root}/${path}`, content, { encoding: 'utf8' });
  },
  setVersion: (version, VERSION_TYPE) => {
    const versionArr = version.split('.');
    return VERSION_TYPE == 'major' ? `${++versionArr[0]}.0.0` : VERSION_TYPE == 'minor' ? `${versionArr[0]}.${++versionArr[1]}.0` : `${versionArr[0]}.${versionArr[1]}.${++versionArr[2]}`;
  }
};