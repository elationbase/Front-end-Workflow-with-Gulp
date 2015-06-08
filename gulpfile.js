var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if')
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	minifyJson = require('gulp-jsonminify'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush');


// File Location vars
var htmlFiles = ['builds/development/*.html'],
	jsFiles   = [
		'components/scripts/libs/*.js',
		'components/scripts/*.js'
	],
	sassFiles = ['components/sass/style.scss'],
	htmlFiles = ['builds/development/*.html'],
	jsonFiles = ['builds/development/js/*.json'],
	imgFiles  = ['builds/development/img/**/*.*'];


// Check for environment and set deault to dev
var env = process.env.NODE_ENV || 'development';


// Options vars
var outputDir, sassStyle;


// Set options based on environment
if ( env ==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}


// JS files
gulp.task('js', function () {
	gulp
		.src(jsFiles)
		.pipe(concat('script.js'))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

// CSS & SASS files
gulp.task('compass', function (){
	gulp
		.src(sassFiles)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle
			})
			.on('error', gulpUtil.log)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox ESR'))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

// HTML files
gulp.task('html', function () {
	gulp
		.src(htmlFiles)
		.pipe(gulpif(env === 'production', minifyHtml()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

// JSON files
gulp.task('json', function () {
	gulp
		.src(jsonFiles)
		.pipe(gulpif(env === 'production', minifyJson()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

// Images files
gulp.task('img', function () {
    gulp
		.src(imgFiles)
        .pipe(gulpif(env === 'production', imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        })))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir+ 'images')))
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
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);	
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(jsonFiles, ['json']);
	gulp.watch(imgFiles, ['img']);
});


gulp.task('default', ['js', 'json', 'compass', 'img', 'connect', 'watch']);

