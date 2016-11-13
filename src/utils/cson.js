const cson = require('cson');

const EXTENSION_REGEXP = /\.cson$/g;

function load(file) {
  const filename = !file.match(EXTENSION_REGEXP) ? `${file}.cson` : file;
  return cson.parseCSONFile(filename);
}

module.exports = {
  load,
};
