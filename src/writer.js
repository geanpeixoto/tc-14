const writeSVGF = require('./writers/svgfont-writer');
const writeTTF = require('./writers/ttf-writer');
const writeWOFF = require('./writers/woff-writer');
const writeCSS = require('./writers/css-writer');
const writeOCSS = require('./writers/css-old-writer');
const writeJSON = require('./writers/json-writer');
const { join } = require('./utils/file-manager');

async function write(font, dest) {
  const svg = await writeSVGF(font, join(dest, `${font.alias}.svg`));
  const ttf = await writeTTF(svg, join(dest, `${font.alias}.ttf`));
  await writeWOFF(ttf, join(dest, `${font.alias}.woff`));
  await writeCSS(font, join(dest, `${font.alias}.css`));
  await writeOCSS(font, join(dest, `${font.alias}.old.css`));
  await writeJSON(font, join(dest, `${font.alias}.json`));
}

module.exports = { write };

/*
const Path = require('path');

const FontFace = require('./fontface');

const CSSWriter = require('./writers/css-writer');
const EOTWriter = require('./writers/eot-writer');
const WOFFWriter = require('./writers/woff-writer');
const WOFF2Writer = require('./writers/woff2-writer');
const ExampleWriter = require('./writers/example-writer');

class Writer {

  constructor(fontface) {
    this.fontface = (fontface instanceof FontFace) ? fontface : new FontFace(fontface);
  }

  write(p) {
    const path = Path.join(process.cwd(), p);
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
*/