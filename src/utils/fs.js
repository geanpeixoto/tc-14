const fs = require('fs');
const mkpath = require('mkpath');
const path = require('path');

function mkdir(p) {
  return new Promise((resolve) => {
    mkpath(p, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
}

function writeFile(filename, data) {
  return mkdir(path.dirname(filename))
    .then(() => new Promise((resolve) => {
      fs.writeFile(filename, data, (err) => {
        if (err) {
          throw err;
        }
        resolve();
      });
    }));
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
  mkdir,
};
