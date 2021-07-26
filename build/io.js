const fs = require('fs').promises;
const path = require('path');
const root = path.resolve(__dirname, '..');
module.exports = {
  readFile: (path) => {
    return fs.readFile(`${root}/${path}`, { encoding: 'utf8' });
  },
  writeFile: (path, content) => {
    return fs.writeFile(`${root}/${path}`, content, { encoding: 'utf8' });
  }
};
