var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    coffee = require('gulp-coffee');

var coffeeScr = 'components/coffee/',
    coffeeFiles = [coffeeScr+ '*.coffee'];

gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
      .pipe(coffee({bare:true})
        .on('error', gulpUtil.log))
      .pipe(gulp.dest('components/scripts'))
});