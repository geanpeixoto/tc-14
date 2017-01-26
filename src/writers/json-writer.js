const { writeFile } = require('../utils/file-manager');

async function write(font, filename) {
  const data = JSON.stringify(font);
  await writeFile(filename, data);
  return data;
}

module.exports = write;
