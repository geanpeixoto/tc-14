const { writeFile } = require('../utils/file-manager');
const cssWriter = require('./css-writer');

function template({ name, alias, groups }) {
  const base = cssWriter.template({ name, alias },
    { makeClass: (append = '') => `[class^="${alias}-"]${append},[class*=" ${alias}-"]${append}` });

  const icons = groups
    .map(group => group.icons)
    .reduce((prev, current) => prev.concat(current))
    .map(icon => `.${alias}-${icon.name}:before { content: '${icon.unicode[0]}' }`)
    .join('\n');

  return `${base}\n${icons}`;
}

async function write(font, filename) {
  const data = template(font);
  await writeFile(filename, data);
  return data;
}

module.exports = write;
