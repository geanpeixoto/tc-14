const fs = require('fs');

function writeFile(filename, data) {
  return new Promise((resolve) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    })
  })
}

module.exports = {
  writeFile,
};
