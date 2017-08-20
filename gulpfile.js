'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'), // препроцессор html
		htmlmin = require('gulp-htmlmin'), // минификатор html
		newer = require('gulp-newer'), // поиск нового измененного файла
		plumber = require('gulp-plumber'), // отлов ошибок
		sass = require('gulp-sass'), // препроцессор css
		autoprefixer = require('gulp-autoprefixer'), // вендорные префиксы
		cssnano = require('gulp-cssnano'), // минификатор css
		sourcemaps = require('gulp-sourcemaps'), // сохранение исходных файлов css
		del = require('del'), // удаление дирректорий
		bs = require('browser-sync').create(), // сервер
		sequence = require('gulp-sequence'), // синхронный запуск задач
		notify = require('gulp-notify'), // выводит системные сообщения
		gulpIf = require('gulp-if'), // условные выражения в gulp
		svgSprite	= require('gulp-svg-sprite'), // спрайты svg
		rename = require('gulp-rename'), // переименование файлов
		concat = require('gulp-concat'), // объединение js файлов в один
		uglify = require('gulp-uglify'); // минификация js

// Favicon
var realFavicon = require('gulp-real-favicon'),
		fs = require('fs');

var FAVICON_DATA_FILE = 'faviconData.json';

// Создание фавикона
gulp.task('favicon:generate', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'app/img/favicon.png', // нужно поменять, если svg или jpg
		dest: 'dist/img/favicon',
		iconsPath: 'img/favicon', // путь к favicon в html
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			}//,
			// safariPinnedTab: { // for ios
			// 	pictureAspect: 'silhouette',
			// 	themeColor: '#5bbad5' // validator fail
			// }
		},
		settings: {
			compression: 1,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		//Для обновления старой иконки у пользователей
		versioning: {
			paramName: 'v',
			paramValue: '1.0.1'
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Добавление фавикона в код HTML
gulp.task('favicon:inject', function() {
	return gulp.src('dist/*.html')
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('dist'));
});

// Обновление фавикона
gulp.task('favicon:update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});


// SVG Sprite
gulp.task('svgSprite', function () {
	return gulp.src(['./app/img/*.svg', '!./app/img/favicon.*'])
		.pipe(plumber())
		.pipe(svgSprite({
			shape: {
				dimension: { // max dimensions
					maxWidth: 2300,
					maxHeight: 2300
				},
				spacing: {
					padding: 0
				}
			},
			mode: {
				css: {
					dest: '.', // dest sprite.css
					bust: false, // хэши
					sprite: '../img/sprite.svg', // путь к спрайту в css
					layout: 'vertical', // diagonal
					//prefix: '%%svg-%s', // svg-%s,'$'' scss
					//dimensions: true, // объединение размеров и url в один класс
					render: {
						scss: {
							dest: './_svg-sprite-positions.scss',
							template: './app/sass/svg-sprite/_svg-sprite-tpl.scss'
						}
					}
				},
				symbol: true
			},
			variables: {
				mapname: "icons"
			}
		}))
		.on('error', function(err){
			console.log(err);
		})
		.pipe(rename({dirname: ''})) // удаление base
		.pipe(gulpIf('*.scss', gulp.dest('./app/sass/svg-sprite'), gulp.dest('dist/img')));
});


// Pug
gulp.task('pug:dev', function() {
	return gulp.src(['./app/*.pug', '!./app/html/**/_*.pug'])
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Pug',
					message: err.message
				};
			})
		}))
		.pipe(newer('./app/**/*.pug'))
		.pipe(pug({
			pretty: '\t' // false - default, true - space, '\t' - tab
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(bs.stream());
});

// HTML minification for PRODUCTION
gulp.task('pug:prod', ['favicon:inject']); // HTML create in dist + favicon inject

gulp.task('htmlmin', ['pug:prod'], function() {
	return gulp.src('dist/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('.'));
});


// SASS
gulp.task('sass:dev', function() {
	return gulp.src(['app/sass/vendor.scss', 'app/sass/main.scss'])
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Sass Develop',
					message: err.message
				};
			})
		}))
		.pipe(newer('app/sass/*.scss'))
		.pipe(sourcemaps.init())
		.pipe(sass()) // для SVG спрайтов import: process.cwd() + '/tmp/scss/svg-sprite'
		.pipe(autoprefixer({
			browsers: ['last 5 versions'], // last 2 versions - default
			cascade: true // выравнивание префиксных свойств (false для минифицирования)
		}))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(bs.stream());
});

gulp.task('sass:prod', function() {
	return gulp.src(['app/sass/vendor.scss', 'app/sass/main.scss'])
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 10 versions'], // last 2 versions - default
			cascade: false // выравнивание префиксных свойств (false для минифицирования)
		}))
		.pipe(concat('style.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('./css'))
});


// JavaScript
var plugJS = [
	'bower_components/jquery/dist/jquery.min.js',
	'bower_components/jquery-migrate/jquery-migrate.min.js',

	'bower_components/photoswipe/dist/photoswipe.min.js',
	'bower_components/photoswipe/dist/photoswipe-ui-default.min.js',
	'app/vendor/photoswipe/ps.js',

	'bower_components/slick-carousel/slick/slick.min.js',
	'app/blocks/slick-carousel_center/_slick-carousel_center.js',

	// 'app/vendor/share42/share42.js',

	'app/js/svg-loader.js',
	'app/js/common.js'
];

gulp.task('js:dev', function () {
	return gulp.src(plugJS)
    .pipe(concat('script.js')) // Объединение в один main.js
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js:prod', function () {
	return gulp.src(plugJS)
    .pipe(concat('script.js'))
    .pipe(uglify()) // Минификация
    .pipe(gulp.dest('./js'));
});


// Clean
gulp.task('clean:dist', function () {
	return del('dist');
});

gulp.task('clean:img', function () {
	return del('dist/img');
});

gulp.task('clean:fonts', function () {
	return del('dist/fonts');
});

gulp.task('clean:prod', function () {
  return del([
  	'css',
  	'js',
  	'img',
  	'fonts',
  	'*.html'
  	]);
});


// APP DEVELOP
// Images
gulp.task('img:dev', ['clean:img', 'svgSprite'], function() {
	return gulp.src([
		'app/img/**/*.{jpg,png,gif}',
		'!app/img/favicon.*' // исключить favicon
	], {base: 'app'})
	.pipe(gulp.dest('dist'))
	.pipe(bs.stream());
});

// Fonts
gulp.task('fonts:dev', ['clean:fonts'], function() {
	return gulp.src([
			'app/fonts/**/*.{svg,ttf,woff}', // eot for ie8
			'!app/fonts/**/_*/*.*'
		], {base: 'app'})
		// .pipe(rename(function (path) {
		// 	path.basename = path.basename.toLowerCase(); // названия файлов в нижнем регистре
		// }))
		.pipe(gulp.dest('dist'))
		.pipe(bs.stream());
});


gulp.task('app:dev', ['fonts:dev', 'img:dev'], function() {
	return gulp.src([
			'app/download/**/*.*',
			'app/*.php',
			'app/.htaccess',
			'app/robots.txt',
			'app/vendor/photoswipe/res/*.*'
		], {base: 'app'})
		.pipe(gulp.dest('dist'));
});


// PRODUCTION
// app
gulp.task('app:prod', function() {
	return gulp.src([
			'dist/fonts/**/*.*',
			'dist/img/**/*.*', '!dist/img/sprite.svg',
			'dist/robots.txt'
		], {base: 'dist'})
		.pipe(gulp.dest('.'));
});


// BUILD
gulp.task('build:dev', sequence('clean:dist', 'app:dev', 'pug:dev', 'js:dev', 'sass:dev'));
gulp.task('build:prod', sequence('clean:prod', 'app:prod', 'htmlmin', 'js:prod', 'sass:prod', 'sitemap'));

gulp.task('default', sequence('build:dev', 'build:prod'));


// Server + Watch
gulp.task('server', ['build:dev'], function() {
	bs.init({
		server: 'dist'
	});

	gulp.watch('app/sass/**/*.scss', ['sass:dev']);
	gulp.watch('app/**/*.pug', ['pug:dev']);
	gulp.watch(['app/js/**/*.js', 'app/blocks/**/*.js'], ['js:dev'])
		.on('change', bs.reload);
	gulp.watch('app/img/**/*.*', ['img:dev'])
		.on('change', bs.reload);
	gulp.watch('app/fonts/**/*.*', ['fonts:dev'])
		.on('change', bs.reload);
});