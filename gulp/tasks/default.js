var gulp = require('gulp');

gulp.task('default', ['browser-sync', 'stylus', 'jade', 'scripts', 'fonts', 'thirdpartyJs', 'thirdpartyCss', 'data', 'root', 'imagemin', 'watch']);

gulp.task('build', ['stylus-min', 'jade-min', 'scripts-min', 'fonts', 'thirdpartyJs', 'thirdpartyCss', 'data', 'root', 'imagemin']);
