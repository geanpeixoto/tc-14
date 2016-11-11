const ttf2woff2 = require('ttf2woff2');
const fs = require('fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const woff2 = ttf2woff2(this.ttf);
    return new Promise(resolve => fs.writeFile(filename, woff2, () => resolve(woff2)));
  }
}

module.exports = EOTWriter;
