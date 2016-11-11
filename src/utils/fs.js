const fs = require('fs');

function writeFile(filename, data) {
  return new Promise((resolve) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
}

function readFile(filename, options = {}) {
  return new Promise((resolve) => {
    fs.readFile(filename, Object.assign({
      encoding: 'utf-8',
    }, options), (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    });
  });
}

module.exports = {
  writeFile,
  readFile,
};
