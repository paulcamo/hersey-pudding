var gulp = require('gulp'),
	browserSync = require('browser-sync');

// Static server
gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: ['./build', './src']
        },
        notify: true,
        files: [
	      './build/**',
	      '!http://localhost:3000/*'
        ]
    });
});