const fs = require('fs');
const svgicons2svgfont = require('svgicons2svgfont');

class Writer {
  static write(outfile, fontface) {
    const stream = svgicons2svgfont({
      fontName: fontface.name,
    });

    stream.pipe(fs.createWriteStream(outfile, {
      flags: 'w',
      defaultEncoding: 'utf8',
    }));

    const promise = new Promise((resolve, reject) => {
      stream
        .on('finish', () => resolve())
        .on('error', err => reject(err));
    });

    fontface.glyphs.forEach(({
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

module.exports = Writer;
