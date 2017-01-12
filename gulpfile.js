var gulp       = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions', '> 1%'], { cascade: true }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src(['src/libs/jquery/jquery.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('src/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync(['css', 'js', 'img', 'fonts', '*.html']);
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([
        'src/css/*.css',
        '!src/css/libs.css'
        ])
    .pipe(gulp.dest('css'))

    var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('fonts'))

    var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('js'))

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest(''));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);