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
    .write(dist);
}

module.exports = run;
