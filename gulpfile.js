const gulp = require('gulp');
const run = require('./build/tasks/run');
const clean = require('./build/tasks/clean');
const preview = require('./build/tasks/preview');
const watch = require('./build/tasks/watch');

gulp.task('run',
  gulp.series(clean, run));

gulp.task('preview',
  gulp.series(clean, run, preview.init));

gulp.task('w:preview',
  gulp.parallel(watch, 'preview'));
