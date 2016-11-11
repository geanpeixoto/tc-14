const svgicons2svgfont = require('svgicons2svgfont');
const fs = require('fs');

class SVGFontWriter {

  constructor(fontface) {
    this.fontface = fontface;
  }

  write(filename) {
    const stream = svgicons2svgfont({
      fontName: this.fontface.name,
    });

    stream.pipe(fs.createWriteStream(filename, {
      flags: 'w',
      defaultEncoding: 'utf8',
    }));

    let svg = '';

    const promise = new Promise((resolve, reject) => {
      stream
        .on('data', (data) => {
          svg += data;
        })
        .on('finish', () => {
          resolve(svg);
        })
        .on('error', err => reject(err));
    });

    this.fontface.glyphs.forEach(({
      file,
      name,
      unicode,
    }) => {
      const glyph = fs.createReadStream(file);
      glyph.metadata = {
        name,
        unicode,
      };
      stream.write(glyph);
    });

    stream.end();

    return promise;
  }
}

module.exports = SVGFontWriter;
