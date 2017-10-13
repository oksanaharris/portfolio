const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('serve', function(){

  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });

  gulp.watch("styles.scss", ['sass']);
  gulp.watch("./*").on('change', browserSync.reload);
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src("styles.scss")
    .pipe(sass())
    .pipe(gulp.dest("css/"))
    // .pipe(browserSync.stream());
});

gulp.task('default', ['serve','sass']);