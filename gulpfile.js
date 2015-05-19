var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect');

var coffeeScr = 'components/coffee/',
	coffeeFiles = [coffeeScr + '*.coffee'];
gulp.task('coffee', function () {
	gulp
		.src(coffeeFiles)
		.pipe(coffee({bare: true})
		.on('error', gulpUtil.log))
		.pipe(gulp.dest('components/scripts'))
});

var jsScr = 'components/scripts/',
    jsFiles = [jsScr+ '*.js'];
gulp.task('js', function () {
	gulp
		.src(jsFiles)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builts/development/js'))
		.pipe(connect.reload())
});

var sassFiles = ['components/sass/style.scss'];
gulp.task('compass', function (){
	gulp
		.src(sassFiles)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builts/development/images',
			style: 'compact'
		})
		.on('error', gulpUtil.log))
		.pipe(gulp.dest('builts/development/css'))
		.pipe(connect.reload())
});


var htmlScr = 'builts/development/',
     htmlFiles = [htmlScr+ '*.html'];
gulp.task('html', function () {
	gulp
		.src(htmlFiles)
		.pipe(connect.reload())
});


var jsonScr = 'builts/development/js/',
     jsonFiles = [jsonScr+ '*.json'];
gulp.task('json', function () {
	gulp
		.src(jsonFiles)
		.pipe(connect.reload())
});


gulp.task('connect', function () {
	connect.server({
		root: 'builts/development/',
		livereload: true
	});
});


gulp.task('watch', function () {
	gulp.watch(coffeeFiles, ['coffee']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);	
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(jsonFiles, ['json']);
});


gulp.task('default', ['coffee', 'js', 'json', 'compass', 'connect', 'watch']);

