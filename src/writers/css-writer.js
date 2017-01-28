const { writeFile } = require('../utils/file-manager');

function template({ name, alias }, options = {}) {
  const {
    makeClass = (append = '') => `.${alias}${append}`,
    src = `url('${alias}.ttf') format('truetype'), url('${alias}.woff') format('woff')`,
  } = options;

  return `
@font-face {
  font-family: '${name}';
  font-style: normal;
  font-weight: 400;
  src: ${src};
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
  font-size: 48px;
  width: 48px;
  height: 48px;
}`;
}

async function write(font, filename) {
  const data = template(font);
  await writeFile(filename, data);
  return data;
}

write.template = template;

module.exports = write;
