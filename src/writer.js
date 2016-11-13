const Path = require('path');

const FontFace = require('./fontface');

const CSSWriter = require('./writers/css-writer');
const SVGFontWriter = require('./writers/svgfont-writer');
const TTFWriter = require('./writers/ttf-writer');
const EOTWriter = require('./writers/eot-writer');
const WOFFWriter = require('./writers/woff-writer');
const WOFF2Writer = require('./writers/woff2-writer');
const ExampleWriter = require('./writers/example-writer');

class Writer {

  constructor(fontface) {
    this.fontface = (fontface instanceof FontFace) ? fontface : new FontFace(fontface);
  }

  write(path) {
    const fonts = this.writeSVG(path)
      .then(svg => this.writeTTF(path, svg))
      .then((ttf) => {
        const ttfa = new Uint8Array(ttf);
        return Promise.all([
          this.writeEOT(path, ttfa),
          this.writeWOFF(path, ttfa),
          this.writeWOFF2(path, ttf),
        ]);
      });

    return Promise.all([
      this.writeCSS(path),
      this.writeExample(path),
      fonts,
    ]);
  }

  writeExample(path) {
    return new ExampleWriter(this.fontface)
      .write(path);
  }

  writeCSS(path) {
    return new CSSWriter(this.fontface)
      .write(this.makeFilename(path, 'css'));
  }

  writeSVG(path) {
    return new SVGFontWriter(this.fontface)
      .write(this.makeFilename(path, 'svg'));
  }

  writeTTF(path, svg) {
    return new TTFWriter(this.fontface, svg)
      .write(this.makeFilename(path, 'ttf'));
  }

  writeEOT(path, ttf) {
    return new EOTWriter(this.fontface, ttf)
      .write(this.makeFilename(path, 'eot'));
  }

  writeWOFF(path, ttf) {
    return new WOFFWriter(this.fontface, ttf)
      .write(this.makeFilename(path, 'woff'));
  }

  writeWOFF2(path, ttf) {
    return new WOFF2Writer(this.fontface, ttf)
      .write(this.makeFilename(path, 'woff2'));
  }

  makeFilename(path, extension) {
    return Path.join(path, 'css', `${this.fontface.alias}.${extension}`);
  }
}

module.exports = Writer;
