const svg2ttf = require('svg2ttf');
const { writeFile } = require('../utils/file-manager');

async function write(svg, filename) {
  const ttf = Buffer.from(svg2ttf(svg).buffer);
  await writeFile(filename, ttf);
  return ttf;
}

module.exports = write;
