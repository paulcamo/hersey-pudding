var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed');

//  CONCATENATE ALL JS FILES INTO ONE, COMPRESS IT AND PUT IT INTO JS FOLDER 
gulp.task('scripts', function() {
    return gulp.src(['./src/js/*.js'])
    .pipe(concat('prodi.ui.min.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('scripts-min', function() {
    return gulp.src(['./src/js/*.js'])
    .pipe(concat('prodi.ui.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// PUTS EVERYTHING INSIDE THE DATA FOLDER INTO DE DATA FOLDER IN BUILD
gulp.task('data', function() {
    return gulp.src('./src/data/**')
    .pipe(changed('./build/data/'))
    .pipe(gulp.dest('./build/data/'));
});

// PUTST EVERYTHING INSIDE THE ROOT FOLDER INTO THE BUILD ROOT
gulp.task('root', function() {
    return gulp.src('src/root/**')
    .pipe(gulp.dest('./build/'));
});