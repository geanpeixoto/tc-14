const { load } = require('./font');
const { write } = require('./writer');

async function exec({rootDir = process.cwd(), dest = process.cwd() } = {}) {
  const font = await load(rootDir);
  return await write(font, dest);
}

module.exports = exec;