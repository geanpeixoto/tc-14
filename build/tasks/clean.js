const del = require('del');

const {
  dist,
} = require('../config');

function clean() {
  return del(dist);
}

module.exports = clean;
