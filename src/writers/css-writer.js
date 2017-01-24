const postcss = require('../utils/postcss');
const fs = require('../utils/fs');

class CSSWriter {

  constructor(fontface) {
    this.fontface = fontface;
  }

  write(filename) {
    const {
      name,
      alias,
    } = this.fontface;

    return postcss.process({
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
      [`.${alias}`]: {
        'font-family': name,
        'font-weight': 'normal',
        'font-style': 'normal',
        display: 'inline-block',
        'text-transform': 'none',
        'letter-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        direction: 'ltr',
        'line-height': '100%',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        'text-rendering': 'optimizeLegibility',
        'font-feature-settings': 'liga',
        overflow: 'hidden',
      },
      [`.${alias}.dp24`]: {
        'font-size': '24px',
        width: '24px',
        height: '24px',
      },
      [`.${alias}.dp36`]: {
        'font-size': '36px',
        width: '36px',
        height: '36px',
      },
      [`.${alias}.dp48`]: {
        'font-size': '48px',
        width: '48px',
        height: '48px',
      },
    })
    .then(data => fs.writeFile(filename, data)
      .then(() => data));
  }
}

module.exports = CSSWriter;
