const ttf2woff = require('ttf2woff');
const fs = require('../utils/fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const woff = new Buffer(ttf2woff(this.ttf).buffer);
    return fs.writeFile(filename, woff)
      .then(() => woff);
  }
}

module.exports = EOTWriter;
