const ttf2woff2 = require('ttf2woff2');
const fs = require('../utils/fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const woff2 = ttf2woff2(this.ttf);
    return fs.writeFile(filename, woff2)
      .then(() => woff2);
  }
}

module.exports = EOTWriter;
