var gulp        = require('gulp');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var eslint      = require('gulp-eslint');
var eslintRc    = require('./eslintrc');
var stylelint   = require('gulp-stylelint');
var browserSync = require('browser-sync').create();
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
 

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js').pipe(eslint({
    'rules': eslintRc.rules
  }))
  .pipe(eslint.format())
});

gulp.task('copy-assets', function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('build-html', function() {
  return gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(stylelint({
        failAfterError: false,
        reporters: [{formatter: 'string', console: true}]
    }))
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('build-js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('purge', ['clean'], function () {
  return gulp.src('node_modules', {read: false})
    .pipe(clean());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
})

gulp.task('start', ['build', 'browser-sync'], function () {
  gulp.watch("src/html/**/*.html", ['build-html']).on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
  gulp.watch('src/js/**/*.js', ['lint', 'build-js']);
});

gulp.task('build', ['lint', 'copy-assets', 'build-html', 'build-css', 'build-js']);
//gulp.task('build', ['lint', 'build-html', 'build-css', 'build-js']);

gulp.task('default', ['start'])
