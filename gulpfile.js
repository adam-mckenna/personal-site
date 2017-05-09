const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const uncss = require('gulp-uncss')
const cssnano = require('gulp-cssnano')
const base64 = require('gulp-base64')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const shorthand = require('gulp-shorthand')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const addsrc = require('gulp-add-src')
const todo = require('gulp-todo')

const paths = {
    src: {
        sass: "./src/scss/**/*.scss",
        js: "./src/js/**/*.js",
        bitmap: "./src/img/src/**/*.{png,jpg,gif}",
        vector: "./src/img/src/**/*.svg"
    },
    build: {
        css: "./build/css",
        js: "./build/js",
        img: "./build/img/"
    },
    babel: {
        es2015: "babel-preset-es2015",
    }
}

gulp.task('sass', () => {
    gulp.src(paths.src.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(shorthand())
        .pipe(base64())
        .pipe(cssnano())
        .pipe(gulp.dest(paths.build.css))
})

gulp.task('js', () => {
    gulp.src(paths.src.js)
        .pipe(plumber(plumberErrorHandler))
        .pipe(babel({
            presets: [paths.babel.es2015]
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.build.js))
})

gulp.task('bitmap', () => {
    gulp.src(paths.src.bitmap)
        .pipe(plumber(plumberErrorHandler))
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest(paths.build.img))
})

gulp.task('vector', () => {
    return gulp.src(paths.src.vector)
        .pipe(svgmin())
        .pipe(gulp.dest(paths.build.img))
})

gulp.task('watch', () => {
    gulp.watch(paths.src.sass, ['sass'])
    gulp.watch(paths.src.js, ['js'])
    gulp.watch(paths.src.bitmap, ['bitmap'])
    gulp.watch(paths.src.vector, ['vector'])
})

gulp.task('todo', () => {
    gulp.src(paths.src)
        .pipe(todo())
        .pipe(gulp.dest('./'))
})

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
}

gulp.task('default', ['sass', 'js', 'bitmap', 'vector', 'watch'])
