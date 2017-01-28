const { load } = require('./src/font');
const { write } = require('./src/writer');

async function exec(config = {}) {
  const {
    rootDir = process.cwd(),
    dest = process.cwd(),
  } = config;

  const font = await load(rootDir);

  return await write(font, dest);
}

module.exports = exec;
