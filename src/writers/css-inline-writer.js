const { writeFile } = require('../utils/file-manager');
const { template } = require('./css-writer');

async function write(font, woff, filename) {
  const base64 = woff.toString('base64');
  const src = `url(data:application/x-font-woff;charset=utf-8;base64,${base64}) format('woff')`;

  const data = template(font, { src });
  await writeFile(filename, data);
  return data;
}

write.template = template;

module.exports = write;
