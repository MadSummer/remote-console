'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
//const browserify = require('gulp-browserify');
const webpack = require('webpack-stream');
const less = require('gulp-less');
gulp.task('less', () => {
  gulp.src('/src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./stylesheets'));
})
gulp.task('clientjs', () => {
  gulp.src('./client/src/remote-console.js')
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
    .pipe(rename('rc.js'))
    //.pipe(gulp.dest('./client/dist'))
    .pipe(gulp.dest('./server/public/javascripts/'))
});
gulp.task('serverjs', () => {
  gulp.src('./client/src/server.js')
    .pipe(webpack(
      require('./webpack.config')
    ))
    .pipe(babel({
      presets: ['es2015']
    }))
    //.pipe(uglify())
    .pipe(rename('rc-remote.js'))
    .pipe(gulp.dest('./server/public/javascripts/'))
});
//gulp.task('default', ['less', 'js']);
gulp.task('watch', () => {
  gulp.watch('./client/src/*.js', ['clientjs','serverjs']);
  //gulp.watch('./server/public/javascripts/server.js', ['serverjs']);
})