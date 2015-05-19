var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify');



// Check for environment and set deault to dev
var env = process.env.NODE_ENV || 'development';


// Sources and file vars
var coffeeScr, coffeeFiles, jsFiles, sassFiles, htmlFiles, jsonFiles, outputDir, sassStyle;

if ( env ==='development') {
	outputDir = 'builts/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builts/production/';
	sassStyle = 'compressed';
}

// COFFEE Script files
coffeeScr = 'components/coffee/';
coffeeFiles = [coffeeScr + '*.coffee'];

gulp.task('coffee', function () {
	gulp
		.src(coffeeFiles)
		.pipe(coffee({bare: true})
			.on('error', gulpUtil.log)
		)
		.pipe(gulp.dest('components/scripts'))
});

// JS files
jsFiles = ['components/scripts/*.js'];

gulp.task('js', function () {
	gulp
		.src(jsFiles)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

// CSS & SASS files
sassFiles = ['components/sass/style.scss'];

gulp.task('compass', function (){
	gulp
		.src(sassFiles)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle
		})
		.on('error', gulpUtil.log))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

// HTML files
htmlFiles = [outputDir + '*.html'];

gulp.task('html', function () {
	gulp
		.src(htmlFiles)
		.pipe(connect.reload())
});

// JSON files
jsonFiles = [outputDir + '*.json'];

gulp.task('json', function () {
	gulp
		.src(jsonFiles)
		.pipe(connect.reload())
});

// http server & Live reload
gulp.task('connect', function () {
	connect.server({
		root: outputDir,
		livereload: true
	});
});


// Gulp watch
gulp.task('watch', function () {
	gulp.watch(coffeeFiles, ['coffee']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);	
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(jsonFiles, ['json']);
});


gulp.task('default', ['coffee', 'js', 'json', 'compass', 'connect', 'watch']);

