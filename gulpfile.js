var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['jshint','mocha']);

gulp.task('jshint', function () {
  return gulp
    .src([
      './gulpfile.js',
      './spec/*.js',
    ])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('mocha', function () {
  return gulp
    .src('spec/*.js')
    .pipe(mocha());
});
