var gulp = require('gulp'),
	changed = require('gulp-changed');

gulp.task('fonts', function() {
	return gulp.src('./src/fonts/**')
	.pipe(changed('./build/fonts/'))
	.pipe(gulp.dest('./build/fonts/'));
});
