const { writeFile } = require('../utils/file-manager');

function template({ name, alias, groups }) {
  const icons = groups
    .map(group => group.icons)
    .reduce((prev, current) => prev.concat(current))
    .map(icon => `.${alias}-${icon.name}:before { content: '${icon.unicode[0]}' }`)
    .join('\n');

  return `
@font-face {
  font-family: ${name};
  font-style: normal;
  font-weight: 400;
  src: url('${alias}.woff') format('woff'),
    url('${alias}.ttf')  format('truetype');
}

[class^="${alias}-"],
[class*=" ${alias}-"] {
  font-family: ${name};
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: liga;
  overflow: hidden;
}

[class^="${alias}-"].dp24,
[class*=" ${alias}-"].dp24 {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

[class^="${alias}-"].dp36,
[class*=" ${alias}-"].dp36 {
  font-size: 36px;
  width: 36px;
  height: 36px;
}

[class^="${alias}-"].dp48,
[class*=" ${alias}-"].dp48 {
  font-size: 48px;
  width: 48px;
  height: 48px;
}

[class^="${alias}-"].inline,
[class*=" ${alias}-"].inline {
  transform: translateY(-.1em);
}

${icons}
`;
}

async function write(font, filename) {
  const data = template(font);
  await writeFile(filename, data);
  return data;
}

module.exports = write;
