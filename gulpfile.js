/** ----------------
Nikhil Venkatesh
26 Dec 2016
---------------- **/

// Packages -----------------------------------------
var browserSync = require('browser-sync').create();
var gulp = require('gulp'),

    // Styles
    sass = require('gulp-sass'),
    glob = require('gulp-sass-glob'),
    cssNano = require('gulp-cssnano'),
    combineMQ = require('gulp-combine-mq'),
    prefix = require('gulp-autoprefixer'),

    // Content
    markdownIt = require('marked'),
    prettify = require('gulp-prettify'),
    include = require('gulp-file-include'),

    // Scripts
    uglify = require('gulp-uglify'),
    newer = require('gulp-newer'),

    // Utils
    plumber = require('gulp-plumber'),
    stripComments = require('gulp-strip-comments');

// BrowserSync Static Server ------------------

gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: "./",
        browser: "google chrome"
    });

    gulp.watch("styles/scss/**/*.scss", ['css']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// Content ------------------------------------
gulp.task('html', function() {
    gulp.src('templates/pages/*.html')
        .pipe(plumber())
        .pipe(include({
            basepath: '',
            filters: {
                markdown: markdownIt.setOptions()
            }
        }))
        .pipe(prettify({
            indent_with_tabs: "true"
        }))
        .pipe(gulp.dest('./'))
});

// Styles -------------------------------------
gulp.task('css', function() {
    return gulp.src('styles/scss/*.{scss,css}')
        .pipe(plumber())
        .pipe(sass()) // SASS Preprocessor
        .pipe(combineMQ()) // Combine all Media Queries
        .pipe(prefix({
            browsers: ['last 4 versions']
        }))
        .pipe(cssNano({
            reduceIdents: false
        }))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

// Scripts ------------------------------------
gulp.task('js', function() {
    gulp.src('scripts/js/**/*.js')
        .pipe(newer('scripts'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts'));
});

// FUNCTIONS //--------------------------------
// Watch Function
gulp.task('watch', function() {
    gulp.watch('templates/**/*.html', ['html']);
    gulp.watch('styles/**/*.scss', ['css']);
    gulp.watch('scripts/js/*.js', ['js']);
});

// Default Function
gulp.task('default', ['serve', 'watch'], function() {});
