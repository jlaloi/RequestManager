'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var path = require('path');
var $ = gulpLoadPlugins();

var dist = "target/classes/static";

gulp.task('lint', function () {
    gulp.src('/src/main/resources/static/js/*.js')
        .pipe($.eslint())
});

gulp.task('build', ["clean"], function () {
    return gulp.src('src/main/resources/static/index.html')
        .pipe($.useref())
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify()))
        .pipe(gulp.dest(dist));
});

gulp.task('clean' , function () {
    return del(path.join(dist));
});
