var gulp = require('gulp');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var react = require('gulp-react');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reactify = require('reactify');
var watchify = require('watchify');

gulp.task('default', ['package']); 

gulp.task('package', function () {
  return gulp.src('lib/**/*.js*')
  .pipe(react())
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
  var bundler = watchify({ extensions: '.jsx' });

  bundler.exclude('stylus');
  bundler.add('./example/app.jsx');

  bundler.transform(reactify);

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
