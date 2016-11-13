const gulp = require('gulp');

const run = require('./run');

const {
  reload,
} = require('./preview');

const {
  src,
} = require('../config');

function watch() {
  gulp.watch(`${src}/**`, gulp.series(run, reload));
}

module.exports = watch;
