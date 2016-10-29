const paths = require('path');
const cson = require('./utils/cson');

const VERSION_REGEXP = /^(\d+\.\d+)/g;

class FontFace {
  constructor({
    name,
    alias,
    glyphs,
    path = '.',
    version = '1.0.0',
  }) {
    this.name = name;
    this.alias = alias;
    this.version = version.match(VERSION_REGEXP)[0];
    this.glyphs = this.constructor.parseGlyphs(glyphs, path);
  }

  static load(filename) {
    const data = cson.load(filename);
    const base = paths.dirname(filename);

    if (!data.name) {
      console.warn('[ERROR] a propriedade {name} é obrigatória');
      throw new Error('name is undefined');
    }

    if (!data.version) {
      console.warn(`[WARNING] considere inserir {version} em sua fonte: ${filename}`);
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
