const browserSync = require('browser-sync').create();

const {
  dist,
} = require('../config');

function init() {
  browserSync.init({
    server: dist,
  });
}

function reload(done) {
  browserSync.reload();
  done();
}

module.exports = {
  init,
  reload,
};
