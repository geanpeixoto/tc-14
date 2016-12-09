const browserSync = require('browser-sync').create();

const {
  dist,
} = require('../config');

function init(done) {
  browserSync.init({
    server: dist,
  }, done);
}

function reload(done) {
  browserSync.reload();
  done();
}

module.exports = {
  init,
  reload,
};
