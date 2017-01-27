/* eslint no-param-reassing: false */
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

    const icons = glyphs
      .map(glyph => `.${alias}-${glyph.name}:before { content: '${glyph.unicode[0]}' }` )
      .join('\n');

    function makeClass(append = '') {
      return `[class^="${alias}-"]${append}, [class*=" ${alias}-"]${append}`;
    }

    const css = `
@font-face {
  font-family: '${name}';
  font-style: normal;
  font-weight: 400;
  src: url('./${alias}.eot');
  src: local('${name}'),
    url('./${alias}.woff') format('woff'),
    url('./${alias}.woff2') format('woff2'),
    url('./${alias}.ttf') format('truetype');
}

${makeClass()} {
  font-family: '${name}';
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" 1;
  font-style: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${makeClass('.dp24')} {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

${makeClass('.dp36')} {
  font-size: 36px;
  width: 36px;
  height: 36px;
}

${makeClass('.dp48')} {
  font-size: 48px,
  width: 48px,
  height: 48px,
}

${icons}
`;

    return fs.writeFile(filename, css)
        .then(() => css);
  }
}

module.exports = OldCSSWriter;
