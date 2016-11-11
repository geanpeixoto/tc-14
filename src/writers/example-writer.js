const path = require('path');
const fs = require('../utils/fs');
const pug = require('../utils/pug');

class ExampleWriter {
  constructor(fontface) {
    this.fontface = fontface;
  }

  write(dest) {
    return Promise.all([
      this.writeIndex(dest),
    ]);
  }

  writeIndex(dest) {
    return fs.readFile(path.join(__dirname, '../templates/index.pug'))
      .then(index => pug.process(index, this.fontface))
      .then(data => fs.writeFile(path.join(dest, 'index.html'), data));
  }
}

module.exports = ExampleWriter;
