const { series, src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
    return del(['dist/**'])
}

const javascript = () => {
    return src('src/*.js')
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(concat('main.js', { newLine: ';' }))
        .pipe(dest('dist/'));
}

const browserSyncServe = (cb) => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    cb();
}

const browserSyncReload = (cb) => {
    browserSync.reload();
    cb();
}

const watch = () => {
    watch('src/index.html', browserSyncReload);
    watch('src/*.js', series(clean, javascript, browserSyncReload));
}

exports.js = series(clean, javascript);

