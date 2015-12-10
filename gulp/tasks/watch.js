var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browser-sync'], function() {
	gulp.watch('./src/styles/**/*.styl', ['stylus']);
	gulp.watch('./src/views/**/*.jade', ['jade']);
	gulp.watch('./src/images/**', ['imagemin']);
	gulp.watch('./src/fonts/**', ['fonts']);
	gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/data/**', ['data']);
	gulp.watch('./src/js/thirdparty/**', ['thirdpartyJs']);
    gulp.watch('./src/styles/thirdparty/**', ['thirdpartyCss']);
});