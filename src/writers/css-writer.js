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

.${alias} {
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
.${alias}.dp24 {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.${alias}.dp36 {
  font-size: 36px;
  width: 36px;
  height: 36px;
}
.${alias}.dp48 {
  font-size: 48px;
  width: 48px;
  height: 48px;
}
    `;

    return fs.writeFile(filename, css)
      .then(() => css);
  }
}

module.exports = CSSWriter;
