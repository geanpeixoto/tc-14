const {
  Writer,
  FontFace,
} = require('../../index');

const {
  example,
  dist,
} = require('../config');

function run() {
  return new Writer(FontFace.load(example))
    .write(dist)
    .catch(err => console.error(err));
}

module.exports = run;
