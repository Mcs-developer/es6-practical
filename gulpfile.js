const { series, src, dest, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

const clean = () => {
    return del(['dist/**'])
}

const javascript = () => {
    return src('src/*.js', { sourcemaps: true })
        .pipe(babel({
            plugins: ['@babel/transform-runtime']
        }))
        .pipe(concat('main.js', { newLine: ';' }))
        .pipe(uglify())
        .pipe(dest('dist/', { sourcemaps: '.' }));
}

const browserSyncServe = (cb) => {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });

    cb();
}

const browserSyncReload = (cb) => {
    browserSync.reload();
    cb();
}

const cache = () => {
    return src('index.html')
        .pipe(replace('/version=\d+/', `version=${new Date().getTime()}`))
        .pipe(dest('.'))
}

const watchFiles = () => {
    watch('index.html', browserSyncReload);
    watch('src/*.js', series(clean, javascript, cache, browserSyncReload));
}

exports.default = series(
    clean,
    javascript,
    cache,
    browserSyncServe,
    watchFiles
)

