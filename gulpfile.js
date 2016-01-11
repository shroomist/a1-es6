
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('less', function() {
  return gulp.src('./src/**/*.less')
  .pipe(watch('./src/**/*.less'))
  .pipe(less({
      paths: [         '.',
        './node_modules/bootstrap-less/bootstrap/' ]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['less'])


