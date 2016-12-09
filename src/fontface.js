const paths = require('path');
const fs = require('fs');
const cson = require('./utils/cson');

const VERSION_REGEXP = /^(\d+\.\d+)/g;
const SVG_REGEP = /\.svg$/g;
const DEFAULT_GROUP = 'unknow';

/**
 * TODO fazer com que os glyphs se divididam entre as pastas
 */
class FontFace {
  constructor({
    name,
    alias,
    glyphs = {},
    path = '.',
    version = '1.0.0',
  }) {
    this.name = name;
    this.alias = alias;
    this.version = version.match(VERSION_REGEXP)[0];
    this.glyphs = this.constructor.parseGlyphs(glyphs, path);
    this.groups = this.getGroups();
  }

  getGroups() {
    return Array.from(this.glyphs.reduce((set, glyph) => {
      set.add(glyph.group);
      return set;
    }, new Set()))
      .sort((item1, item2) => item1.localeCompare(item2));
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

    const path = data.path = paths.join(base, data.path);
    data.glyphs = this.mergeGlyphs(this.loadGlyphs(path), data.glyphs);

    return new this(data);
  }

  static mergeGlyphs(...args) {
    const glyphs = args[0];
    args.slice(1)
      .filter(item => !!item)
      .forEach((arg) => {
        Object.keys(arg)
          .forEach((name) => {
            const glyph = arg[name];
            const current = glyphs[name];

            if (!current) {
              glyphs[name] = glyph;
            } else {
              Object.assign(current, glyph);
            }
          });
      });
    return glyphs;
  }

  static loadGlyphs(path) {
    return fs.readdirSync(path)
      .filter(file => fs.statSync(paths.join(path, file)).isDirectory())
      .reduce((glyphs, dir) => {
        fs.readdirSync(paths.join(path, dir))
          .filter(file => file.match(SVG_REGEP))
          .map(file => file.replace(SVG_REGEP, ''))
          .forEach((glyph) => {
            glyphs[glyph] = {
              file: `${dir}/${glyph}.svg`,
              group: dir,
            };
          });

        return glyphs;
      }, {});
  }

  static parseGlyphs(glyphs, path) {
    return Object.keys(glyphs)
      .map((glyph) => {
        const {
          name,
          unicode,
          file,
          group = DEFAULT_GROUP,
          description,
        } = glyphs[glyph];

        const me = name || glyph;
        let filename = paths.join(path, file || glyph);

        if (!filename.match(/\.svg$/g)) {
          filename = `${filename}.svg`;
        }

        return {
          name: me.toLowerCase(),
          file: filename,

          unicode: [me].concat(unicode).filter(value => value),
          group,
          description,
        };
      })
      .sort((item1, item2) => item1.name.localeCompare(item2.name));
  }
}

module.exports = FontFace;
