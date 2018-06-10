const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cssnano = require('gulp-cssnano')
const base64 = require('gulp-base64')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const shorthand = require('gulp-shorthand')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const addsrc = require('gulp-add-src')
const todo = require('gulp-todo')
const browserSync = require('browser-sync').create()
const livereload = require('gulp-livereload')
const replace = require('gulp-replace')
const fs = require('fs')
const rollup = require('gulp-rollup')

// TODO: add general build task

const paths = {
    src: {
        sass: "src/scss/**/*.scss",
        js: "src/js/**/*.js",
        bitmap: "src/img/**/*.{png,jpg,gif}",
        vector: "src/img/**/*.svg",
        ico: "src/img/**/*.ico",
        header: "_includes/header.html"
    },
    build: {
        css: "build/css",
        js: "build/js",
        img: "build/img"
    },
    babel: {
        es2015: "babel-preset-es2015",
    }
}

gulp.task('sass', () => {
    gulp.src(paths.src.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules/susy/sass']
        }))
        .pipe(shorthand())
        .pipe(base64()) 
        .pipe(cssnano())
        .pipe(gulp.dest(paths.build.css))
        .pipe(livereload())
})

gulp.task('js', () => {
    return gulp.src(paths.src.js)       
        .pipe(plumber(plumberErrorHandler))
        .pipe(rollup({
            input: 'src/js/scripts.js',
            output: { format: 'umd' }
        }))
        .pipe(babel({
            presets: [ paths.babel.es2015 ]
        })) 
        .pipe(uglify()) 
        .pipe(gulp.dest(paths.build.js))
        .pipe(livereload())
})

gulp.task('bitmap', () => {
    gulp.src(paths.src.bitmap)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
}) 

gulp.task('vector', () => {
    gulp.src(paths.src.vector)
        .pipe(plumber(plumberErrorHandler))
        .pipe(svgmin())
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
})

gulp.task('ico', () => {
    gulp.src(paths.src.ico)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
})

gulp.task('generate-header', () => {
    return gulp.src('_includes/header.html')
        .pipe(replace(/<link href="inline.css"[^>]*>/, (s) => {
            let style = fs.readFileSync('build/css/inline.css', 'utf8')
            return '<style>\n' + style + '\n</style>'
        }))
        .pipe(replace(/<meta id="loadCSS"[^>]*>/, (s) => {
            let style = fs.readFileSync('node_modules/fg-loadcss/dist/cssrelpreload.min.js', 'utf8')
            return '<script>\n' + style + '\n</script>'
        }))
        .pipe(gulp.dest('_includes/build'))
})

gulp.task('watch', () => {
    browserSync.init({
        proxy: "127.0.0.1:4000"
    })
    livereload.listen()
    gulp.watch(paths.src.sass, ['sass'])
    gulp.watch(paths.src.js, ['js'])
    gulp.watch(paths.src.bitmap, ['bitmap'])
    gulp.watch(paths.src.vector, ['vector'])
    gulp.watch(paths.src.ico, ['ico'])
    gulp.watch(paths.src.sass, ['generate-header'])
    gulp.watch(paths.src.header, ['generate-header'])
})

gulp.task('todo', () => {
    gulp.src(paths.src)
        .pipe(todo())
        .pipe(gulp.dest('./'))
        .pipe(livereload())
})

const plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
}

gulp.task('default', ['sass', 'js', 'bitmap', 'vector', 'watch'])