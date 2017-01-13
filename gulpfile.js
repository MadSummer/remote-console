'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
//const browserify = require('gulp-browserify');
const webpack = require('gulp-webpack');
const less = require('gulp-less');
gulp.task('less', () => {
  gulp.src('/src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./stylesheets'));
})
gulp.task('js', () => {
  gulp.src('./client/src/*.js')
    /*.pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))*/ 
    .pipe(webpack(
      require('./webpack.config')
    ))
    .pipe(babel({
      presets: ['es2015']
    }))
    //.pipe(uglify())
    .pipe(gulp.dest('./client/dist'))
    .pipe(gulp.dest('./server/public/javascripts/'))
});

gulp.task('default', ['less', 'js']);
gulp.task('watch', () => {
  gulp.watch('./client/src/*.js', ['js']);
})