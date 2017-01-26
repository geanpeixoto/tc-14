const ttf2woff = require('ttf2woff');
const { writeFile } = require('../utils/file-manager');

async function write(ttf, filename) {
  const woff = Buffer.from(ttf2woff(ttf).buffer);
  await writeFile(filename, woff);
  return woff;
}

module.exports = write;
