var gulp = require('gulp'),
	imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {
    return gulp.src('src/img/**')
	.pipe(imagemin({
	    progressive: true
	}))
	.pipe(gulp.dest('./build/img/'));
});