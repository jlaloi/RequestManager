'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var path = require('path');

var $ = gulpLoadPlugins();

var dist = "target/classes/static/";

gulp.task('build', ["clean"], function () {
    return gulp.src('src/main/resources/static/*.html')
            .pipe($.useref())
            .pipe($.if('*.css', $.minifyCss()))
            .pipe($.if('*.js', $.ngAnnotate()))
            .pipe($.if('*.js', $.uglify()))
            .pipe(gulp.dest(dist))
        & gulp.src('src/main/resources/static/templates/*.html')
            .pipe(gulp.dest(dist + 'templates/'));
});

gulp.task('clean', function () {
    return del(path.join(dist));
});


