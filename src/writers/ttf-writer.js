const svg2ttf = require('svg2ttf');
const fs = require('../utils/fs');

class TTFWriter {

  constructor(fontface, svg) {
    this.fontface = fontface;
    this.svg = svg;
  }

  write(filename) {
    const {
      version,
    } = this.fontface;

    const ttf = new Buffer(svg2ttf(this.svg, {
      version,
    }).buffer);

    return fs.writeFile(filename, ttf)
      .then(() => ttf);
  }
}

module.exports = TTFWriter;
