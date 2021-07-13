const { series, src, dest } = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const clean = () => {
    return del(['dist/**'])
}

const javascript = () => {
    return src('src/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // minificar
    // uglify
    .pipe(dest('dist/'));
}

exports.bundle = series(clean, javascript);

