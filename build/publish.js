const package = require('../package.json');
const { readFile, writeFile, setVersion } = require('./io.js');
const { exec } = require('child_process');
const VERSION_TYPE = process.env.VERSION_TYPE || 'patch';
package.version = setVersion(package.version, VERSION_TYPE);
const newPackage = JSON.stringify(package, null, "\t");
delete package.private;
writeFile('package.json', JSON.stringify(package, null, "\t")).then((data) => {
  exec(`npm publish`, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    writeFile('package.json', newPackage, "\t");
  });
});
