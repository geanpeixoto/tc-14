const cson = require('cson');

const EXTENSION_REGEXP = /\.cson$/g;

function load(file) {
  const filename = !EXTENSION_REGEXP.exec(file) ? `${file}.cson` : file;
  return cson.parseCSONFile(filename);
}

module.exports = {
  load,
};
