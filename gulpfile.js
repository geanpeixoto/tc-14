const gulp = require('gulp');
const run = require('./build/tasks/run');
const clean = require('./build/tasks/clean');

gulp.task('preview', gulp.series(clean, run));
