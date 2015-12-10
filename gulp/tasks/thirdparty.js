var gulp = require('gulp'),
	changed = require('gulp-changed');

gulp.task('thirdpartyJs', function() {
	return gulp.src('./src/js/thirdparty/**')
	.pipe(changed('./build/js/thirdparty/'))
	.pipe(gulp.dest('./build/js/thirdparty/'));
});

gulp.task('thirdpartyCss', function() {
    return gulp.src('./src/styles/thirdparty/**')
    .pipe(changed('./build/styles/thirdparty/'))
    .pipe(gulp.dest('./build/css/thirdparty/'));
});
