const gulp = require("gulp");
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

// create task
gulp.task('css', () => {
  gulp.src('/app/css/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('/app/build/css'))
});

gulp.task('watch', () => {
  gulp.watch('/app/css/*.css', ['css']);
});

gulp.task('copy', () => {
  gulp.src(['./app/index.html', './app/manifest.json'])
    .pipe(gulp.dest('./app/build/'));
});

gulp.task('default', ['copy', 'css', 'watch'])
