const cson = require('cson');

const EXTENSION_REGEXP = /\.cson$/g;

function load(file) {
  const filename = !file.match(EXTENSION_REGEXP) ? `${file}.cson` : file;
  const r = cson.parseCSONFile(filename);
  if (r instanceof Error) {
    throw r;
  }
  return r;
}

module.exports = {
  load,
};
