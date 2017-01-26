const gulp = require('gulp');
const eslint = require('gulp-eslint');
const ava = require('gulp-ava');

gulp.task('lint', () => {
  return gulp.src(['lib/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src('test/*.js')
    .pipe(ava())
});

gulp.task('default', ['lint', 'test']);
