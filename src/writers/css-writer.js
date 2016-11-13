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
        'font-size': '24px',
        display: 'inline-block',
        'line-height': 1,
        'text-transform': 'none',
        'letter-spacing': 'normal',
        'word-wrap': 'normal',
        'white-space': 'nowrap',
        direction: 'ltr',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        'text-rendering': 'optimizeLegibility',
        'font-feature-settings': 'liga',
      },
    })
    .then(data => fs.writeFile(filename, data)
      .then(() => data));
  }
}

module.exports = CSSWriter;
