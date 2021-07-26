const package = require('../package.json');
const { readFile, writeFile } = require('./io.js');
const { exec } = require('child_process');
const process = require('process');
const newPackage = JSON.stringify(package, null, "\t");
delete package.private;
writeFile('package.json', JSON.stringify(package, null, "\t")).then((data) => {
  exec('npm publish', function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    writeFile('package.json', newPackage, "\t");
  });
});
