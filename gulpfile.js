const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('minify-css', () => {
    return gulp.src('sass/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});