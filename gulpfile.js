const gulp = require('gulp');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const ava = require('gulp-ava');
const through = require('through2');

const files = ['gulpfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'];

gulp.task('lint', () => (
  gulp
    .src(files)
    .pipe(eslint())
    .pipe(eslint.format('codeframe'))
    .pipe(eslint.failAfterError())
));

gulp.task('test', () => (
  gulp.src('test/*.js').pipe(ava())
));

gulp.task('watch', () => (
  watch(files, () => gulp.run(['lint', 'test']))
));

gulp.task('default', ['lint', 'test', 'watch']);
