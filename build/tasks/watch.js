const gulp = require('gulp');
const { templates } = require('../config');
const run = require('./run');

function watch() {
  gulp.watch(templates, run);
}

module.exports = watch;
