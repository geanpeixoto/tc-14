const ttf2woff = require('ttf2woff');
const fs = require('fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const woff = new Buffer(ttf2woff(this.ttf).buffer);
    return new Promise(resolve => fs.writeFile(filename, woff, () => resolve(woff)));
  }
}

module.exports = EOTWriter;
