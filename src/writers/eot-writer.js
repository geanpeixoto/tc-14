const ttf2eot = require('ttf2eot');
const fs = require('fs');

class EOTWriter {
  constructor(fontface, ttf) {
    this.fontface = fontface;
    this.ttf = ttf;
  }

  write(filename) {
    const eot = new Buffer(ttf2eot(this.ttf).buffer);
    return new Promise(resolve => fs.writeFile(filename, eot, () => resolve(eot)));
  }
}

module.exports = EOTWriter;
