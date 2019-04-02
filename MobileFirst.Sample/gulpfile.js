/* gulpfile.js */
var
  gulp = require('gulp'),
  sass = require('gulp-sass');

// source and distribution folder
var
  source = 'stylesheets/',
  dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
  in: './stylesheets/bootstrap/'
};

// Bootstrap fonts source
var fonts = {
  in: ['fonts/bootstrap/*'],
  out: dest + 'fonts/'
};

// Our scss source folder: .scss files
var scss = {
  in: source + 'main.scss',
  out: dest + 'css/',
  watch: source + 'scss/**/*',
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [bootstrapSass.in]
  }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
  return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

gulp.task('default', ['sass'], function () {
  gulp.watch(scss.watch, ['sass']);
});
