/*================================
=            Required            =
================================*/


var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	htmlmin = require('gulp-htmlmin'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	webpack = require('gulp-webpack'),
	csslint = require('gulp-csslint'),
	size = require('gulp-size'),
	rev = require('gulp-rev'),
	bytediff = require('gulp-bytediff'),
	imagemin = require('gulp-imagemin'),
	revReplace = require('gulp-rev-replace');


/*===================================
=            Script Task            =
===================================*/

gulp.task('scripts', function() {
	gulp.src(['src/javascripts/**/*.js', '!src/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(webpack({
		output: {
			filename: 'app.min.js'
		}
	}))
	.pipe(uglify())
	.pipe(size())
	.pipe(gulp.dest('public/javascripts'))
	.pipe(reload({stream:true}));
})

/*=================================
=            HTML Task            =
=================================*/

gulp.task('html', function () {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(size())
    .pipe(gulp.dest('public/html'))
    .pipe(reload({stream:true}));
});

/*============================================
=            Compass / Sass Tasks            =
============================================*/
gulp.task('sass', function() {
	return gulp.src('src/stylesheets/**/*.scss')
	.pipe(plumber())
	.pipe(bytediff.start())
	.pipe(sourcemaps.init())
	
	.pipe(sass().on('error', sass.logError))
	.pipe(csslint())
	.pipe(csslint.reporter())
	.pipe(rename({suffix: '.min'}))
	.pipe(cssnano())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(sourcemaps.write())
	.pipe(size())
	.pipe(bytediff.stop())
	.pipe(gulp.dest('public/stylesheets'))
	.pipe(reload({stream:true}));
});

/*====================================
=            Images Tasks            =
====================================*/

gulp.task('images', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
});


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: ['./src/html', './src/']
		}
	})
})

gulp.task('build:serve', function(){
	browserSync({
		server: {
			baseDir: ['./public/html', './public/']
		}
	})
})
/*==================================
=            Watch Task            =
==================================*/
gulp.task('watch', function() {
	gulp.watch('src/javascripts/**/*.js', ['scripts']);
	gulp.watch('src/stylesheets/**/*.scss', ['sass']);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/images/*', ['images']);
});



/*====================================
=            Default Task            =
====================================*/

gulp.task('default', ['scripts', 'sass', 'html', 'images', 'build:serve', 'watch']);
