const paths = require('path');
const cson = require('./utils/cson');

class FontFace {
  constructor({
    name,
    path = '.',
    glyphs,
  }) {
    this.name = name;
    this.glyphs = this.constructor.parseGlyphs(glyphs, path);
  }

  static load(filename) {
    const data = cson.load(filename);
    const base = paths.dirname(filename);

    if (!data.name) {
      data.name = /([^\/\\]+)\.cson?$/.exec(filename)[1];
    }

    data.path = paths.join(base, data.path);

    return new this(data);
  }

  static parseGlyphs(glyphs, path) {
    return Object.keys(glyphs).map((glyph) => {
      const {
        name,
        unicode,
        file,
        groups,
        description,
      } = glyphs[glyph];

      const me = name || glyph;
      let filename = paths.join(path, file || glyph);

      if (!filename.match(/\.svg$/g)) {
        filename = `${filename}.svg`;
      }

      return {
        name: me,
        file: filename,

        unicode: [me].concat(unicode).filter(value => value),
        groups,
        description,
      };
    });
  }
}

module.exports = FontFace;
