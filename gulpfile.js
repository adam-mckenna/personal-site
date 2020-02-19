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
const todo = require('gulp-todo')
const replace = require('gulp-replace')
const rollup = require('gulp-rollup')
const clean = require('gulp-clean')
const livereload = require('gulp-livereload')
const browserSync = require('browser-sync').create()
const fs = require('fs')

const paths = {
    src: {
        sass: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        bitmap: 'src/img/**/*.{png,jpg,gif}',
        vector: 'src/img/**/*.svg',
        ico: 'src/img/**/*.ico',
        header: '_includes/header.html'
    },
    build: {
        root: 'build',
        css: 'build/css',
        inline: 'build/css/inline.css',
        js: 'build/js',
        img: 'build/img',
        header: '_includes/build'
    },
    babel: {
        es2015: 'babel-preset-es2015'
    },
    libs: {
       csspreload: 'node_modules/fg-loadcss/dist/cssrelpreload.min.js'
    }
}

const plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
}

gulp.task('sass', () => 
    gulp.src(paths.src.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({
            outputStyle: 'compressed'
        })) 
        .pipe(shorthand())
        .pipe(base64()) 
        .pipe(cssnano())
        .pipe(gulp.dest(paths.build.css))
        .pipe(livereload())
)

gulp.task('js', () => 
    gulp.src(paths.src.js)       
        .pipe(plumber(plumberErrorHandler))
        .pipe(rollup({
            input: 'src/js/app.js',
            output: { 
                format: 'umd',
            },
            plugins: [
                babel({ 
                    presets: [ paths.babel.es2015 ] 
                }),
                uglify()
            ]
        }))
        .pipe(gulp.dest(paths.build.js))
        .pipe(livereload())
)

gulp.task('bitmap', () => 
    gulp.src(paths.src.bitmap)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
) 

gulp.task('vector', () => 
    gulp.src(paths.src.vector)
        .pipe(plumber(plumberErrorHandler))
        .pipe(svgmin())
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
)

gulp.task('ico', () => 
    gulp.src(paths.src.ico)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(paths.build.img))
        .pipe(livereload())
)

gulp.task('generate-header', () => 
    gulp.src(paths.src.header, { allowEmpty: true })
        .pipe(replace(/<link href="inline.css"[^>]*>/, (s) => {
            const style = fs.readFileSync(paths.build.inline, 'utf8')
            return `<style>\n${style}\n</style>`;
        }))
        .pipe(replace(/<meta id="loadCSS"[^>]*>/, (s) => {
            const script = fs.readFileSync(paths.libs.csspreload, 'utf8')
            return `<script>\n${script}\n</script>`
        }))
        .pipe(gulp.dest(paths.build.header))
)
 
gulp.task('clean', () =>  
    gulp.src(paths.build.root, {allowEmpty: true, read: false })
        .pipe(clean())
)

gulp.task('todo', () => 
    gulp.src(paths.src)
        .pipe(todo())
        .pipe(gulp.dest('./'))
        .pipe(livereload())
)

gulp.task('mid-build', gulp.parallel('sass', 'js', 'bitmap', 'ico', 'vector'))

gulp.task('build', gulp.series('clean', 'mid-build', 'generate-header'));

gulp.task('watch', gulp.series('build', () => {
    browserSync.init({
        proxy: '127.0.0.1:4000'
    })
    livereload.listen()
    gulp.watch(paths.src.sass, ['sass'])
    gulp.watch(paths.src.js, ['js'])
    gulp.watch(paths.src.bitmap, ['bitmap'])
    gulp.watch(paths.src.vector, ['vector'])
    gulp.watch(paths.src.ico, ['ico'])
    gulp.watch(paths.src.sass, ['generate-header'])
    gulp.watch(paths.src.header, ['generate-header'])
}))