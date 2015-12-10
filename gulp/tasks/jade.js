var gulp = require('gulp'),
    jade = require('gulp-jade');

gulp.task('jade', function() {
    return gulp.src('./src/views/pages/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('jade-min', function() {
    return gulp.src('./src/views/pages/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./build/'));
});