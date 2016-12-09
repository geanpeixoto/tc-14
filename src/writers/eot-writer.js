const ttf2eot = require('ttf2eot');
const fs = require('../utils/fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const eot = Buffer.from(ttf2eot(this.ttf).buffer);
    return fs.writeFile(filename, eot)
      .then(() => eot);
  }
}

module.exports = EOTWriter;
