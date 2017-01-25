/* eslint no-param-reassing: false */

const postcss = require('../utils/postcss');
const fs = require('../utils/fs');

class OldCSSWriter {

  constructor(fontface) {
    this.fontface = fontface;
  }

  write(filename) {
    const {
      name,
      alias,
      glyphs,
    } = this.fontface;

    const icons = glyphs.reduce((ret, glyph) => {
      ret[`.${alias}-${glyph.name}:before`] = {
        content: `'${glyph.unicode[0]}'`,
      };
      return ret;
    }, {});

    function makeClass(append = '') {
      return `[class^="${alias}-"]${append}, [class*=" ${alias}-"]${append}`;
    }

    return postcss.process(Object.assign({
      '@font-face': {
        'font-family': name,
        'font-style': 'normal',
        'font-weight': 400,
        src: [
          `url(${alias}.eot)`,
          `local(${name}),
          local(${alias}),
          url(${alias}.woff2) format('woff2'),
          url(${alias}.woff) format('woff'),
          url(${alias}.ttf) format('truetype')`,
        ],
      },
      [makeClass()]: {
        'vertical-align': 'middle',
        'font-family': name,
        'font-weight': 'normal',
        'font-style': 'normal',
        display: 'inline-block',
        'line-height': '100%',
        'text-transform': 'none',
        'letter-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        direction: 'ltr',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        'text-rendering': 'optimizeLegibility',
        'font-feature-settings': 'liga',
        overflow: 'hidden',
      },
      [makeClass('.dp24')]: {
        'font-size': '24px',
        width: '24px',
        height: '24px',
      },
      [makeClass('.dp36')]: {
        'font-size': '36px',
        width: '36px',
        height: '36px',
      },
      [makeClass('.dp48')]: {
        'font-size': '48px',
        width: '48px',
        height: '48px',
      },
    }, icons))
      .then(data => fs.writeFile(filename, data)
        .then(() => data));
  }
}

module.exports = OldCSSWriter;
