const svg2ttf = require('svg2ttf');
const fs = require('fs');

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

    return new Promise(resolve => fs.writeFile(filename, ttf, () => resolve(ttf)));
  }
}

module.exports = TTFWriter;
