"use strict";

var gulp = require ('gulp');
var sass = require ('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
var server = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var rename  = require('gulp-rename');
var imagemin = require('gulp-imagemin');


gulp.task('sass', function(done) {
        return gulp.src('css/styles.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssnano())
		.pipe(rename({suffix: '.min'}))

        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('css'));
        pipe(browserSync.stream());

        done();
    });

gulp.task('serve', function(done) {
    browserSync.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    })

    gulp.watch("css/**/*.{scss,sass}", gulp.series('sass'));
    gulp.watch("*.html").on('change', () => {
        browserSync.reload();
        done();
    });

    done();


});

gulp.task('default', gulp.series('sass', 'serve'));