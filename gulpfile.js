var gulp = require('gulp');
var brfs = require('gulp-brfs');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var react = require('gulp-react');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

gulp.task('default', ['package']); 

gulp.task('package', function () {
  return gulp.src('lib/**/*.js*', {buffer: false})
  .pipe(streamify(react()))
  .pipe(brfs())
  .pipe(gulp.dest('pkg'));
});

gulp.task('watch', ['default'], function () {
  gulp.watch('./lib/**/*', ['package']);
});

gulp.task('example', ['example/stylesheets', 'example/app'], function () {
  gulp.watch('./example/*.scss', ['example/stylesheets']);

  return connect.server({
    root: ['example/dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('example/app', function () {
  var bundler = watchify(browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: '.jsx'
  }));

  bundler.exclude('stylus');
  bundler.add('./example/app.jsx');

  bundler.transform(reactify);
  bundler.transform(brfs.brfs);

  bundler.on('update', rebundle);
  bundler.on('error', console.log.bind(console));

  function rebundle () {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./example/dist/js'))
      .pipe(connect.reload());
  }

  return rebundle();
});

gulp.task('example/stylesheets', function () {

  return gulp.src('./example/screen.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./example/dist/css'))
    .pipe(connect.reload());
});

gulp.task('example/minify', function () {
  return gulp.src('./example/dist/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('./example/dist/js'));
});
