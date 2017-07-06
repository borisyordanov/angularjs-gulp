const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlreplace = require('gulp-html-replace');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const debug = require('gulp-debug');


gulp.task('hello-world', function() {
	console.log('gulp task');
});

gulp.task('sass', function() {
	return gulp.src('app/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 5%'],
			cascade: false
		}))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/public/stylesheets'));
});

gulp.task('scripts', function() {
	gulp.src(['app/**/*.module.js', 'app/**/*.js'])
	 .pipe(debug())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('app/public/js'))
		.pipe(rename('scripts.min.js'))
		.pipe(uglify())
		.on('error', (err) => {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe(gulp.dest('app/public/js'));
});


gulp.task('watcher', function() {
	gulp.watch('app/**/*.scss', ['sass']);
	gulp.watch('app/**/*.js', ['js']);
});


gulp.task('default', function() {
	gulp.start('watcher');
});

gulp.task('js', function() {
	runSequence('scripts', 'includes');
});


gulp.task('includes', function() {
	return gulp.src('index.html')
		.pipe(htmlreplace({
			scripts: {
				src: ['app/public/js/scripts.min.js'],
				tpl: '<script src="%s"></script>'
			}
		}))
		.pipe(gulp.dest('app/public/'));
});
