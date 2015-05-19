var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify');

var coffeeScr = 'components/coffee/',
    coffeeFiles = [coffeeScr+ '*.coffee'];

gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
      .pipe(coffee({bare:true})
        .on('error', gulpUtil.log))
      .pipe(gulp.dest('components/scripts'))
});

var jsScr = 'components/scripts/',
    jsFiles = [jsScr+ '*.js'];

gulp.task('js', function(){
  gulp.src(jsFiles)
      .pipe(concat('script.js'))
      .pipe(browserify())
      .pipe(gulp.dest('builts/development/js'))
});
