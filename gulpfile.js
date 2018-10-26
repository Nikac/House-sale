const gulp = require('gulp');
const sass =require('gulp-sass');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Copy all Html
gulp.task('copyHTML', function() {
	return gulp.src('./*.html')
		.pipe(gulp.dest('dist'));
});

// Image compressing
gulp.task('imagemin', function() {
	return gulp.src('./img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Compile SASS
gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({ stream: true }));
});

// static server  + watching HTML/SCSS
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

});

gulp.task('default', ['copyHTML', 'imagemin', 'sass', 'browserSync'], function() {
	gulp.watch('./img/*', ['imagemin']);
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});