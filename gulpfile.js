'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var path = require('path');
var copy = require('copy');

var $ = gulpLoadPlugins();

var dist = "target/classes/static/";

gulp.task('lint', function () {
    gulp.src('/src/main/resources/static/js/*.js')
        .pipe($.eslint())
});

gulp.task('build', ["clean"], function () {
    gulp.src('src/main/resources/static/*.html')
        .pipe($.useref())
        .pipe($.if('*.css', $.minifyCss()))
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify()))
        .pipe(gulp.dest(dist));
    copy(path.join('src/main/resources/static/templates/'), path.join(dist));
});

gulp.task('clean' , function () {
    del(path.join(dist));

});



