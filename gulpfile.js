const gulp = require("gulp");
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

// create task
gulp.task('css', () => {
  gulp.src('./client/app/css/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./client/app/build'))
});

gulp.task('watch', () => {
  gulp.watch('./client/app/css/*.css', ['css']);
});

gulp.task('copy', () => {
  gulp.src(['./client/app/index.html', './client/app/manifest.json'])
    .pipe(gulp.dest('./client/app/build/'));
});

gulp.task('default', ['copy', 'css', 'watch'])
