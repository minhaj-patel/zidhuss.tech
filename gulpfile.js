// Gulp Dependnecies
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    validator = require('gulp-html'),
    image = require('gulp-image'),
    sass = require('gulp-sass'),
    del = require('del');

// Dev Dependnecies
var browserSync = require('browser-sync').create();


gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.tast('clean', function() {
    return del('build/');
});

// Serve
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch("src/**/*.scss", ['styles']);
    gulp.watch("src/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("./src/**/*.scss")
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest("./build/styles"))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src("./src/**/*.js")
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function() {
    return gulp.src("./src/*.html")
    .pipe(plumber())
    .pipe(gulp.dest("./build/"));
});

gulp.task('watch', function() {
    gulp.watch("./src/*.html", ['html']);
    gulp.watch("./src/**/*.css", ['styles']);
});

gulp.task('images', function() {
    return gulp.src("./src/images/*")
    .pipe(image())
    .pipe(gulp.dest("./build/images"));
});

gulp.task('build', ['styles', 'scripts', 'html', 'images']);

gulp.task('default', ['watch']);
