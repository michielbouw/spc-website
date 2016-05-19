require('newrelic');
// Core
var colors      = require('colors');
var gulp        = require('gulp');
var es          = require('event-stream');
var merge       = require('merge-stream');
var path        = require('path');
var stylish     = require('jshint-stylish');
var util        = require('gulp-util');

// Server
var spawn       = require('child_process').spawn;
var spawn_node  = null;

// Gulp plugins
var annotate    = require('gulp-ng-annotate');
var concat      = require('gulp-concat');
var folders     = require('gulp-folders');
var include     = require('gulp-include');
var jshint      = require('gulp-jshint');
var livereload  = require('gulp-livereload');
var sass        = require('gulp-sass');
var templates   = require('gulp-ng-templates');
var watch       = require('gulp-watch');
var sourcemaps  = require('gulp-sourcemaps');
var googleWF    = require('gulp-google-webfonts');

// Gulp Production plugins
var uglify      = require('gulp-uglify');
var uglifycss   = require('gulp-uglifycss');
var htmlmin     = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var del         = require('del');

// Modules path
var path_modules = 'src/modules/';

// Default task
gulp.task('default', ['build'], function()
{
    gulp.start.apply(gulp, ['server:watch', 'server:start']);
});

gulp.task('heroku', ['build:prod']);

// Tasks
gulp.task('server:start', function()
{
    // Clean up spawn_node
    if(spawn_node !== null)
        spawn_node.kill();

    // Spawn new process
    spawn_node = spawn('node', ['server.js']);
    spawn_node.stdout.on('data', stdoutFormat);
    spawn_node.stderr.on('data', stdoutFormat);
});

gulp.task('server:watch', function()
{
    livereload.listen();

    watch(['server.js', 'app/**/*'], function(){
        util.log('[' + 'server.js'.gray + ']', 'Reload');
        gulp.start.apply(gulp, ['server:start']);
    });
    watch(['src/*.html', 'src/**/*'], function(){
        gulp.start.apply(gulp, ['build']);
    });
});


// Default scripts
gulp.task('build', [
    //'build:resources',
    'build:styles',
    'build:scripts',
    'build:modules'
], function(){
    livereload.reload();

    return del([
        'build/modules/**/*',
        'build/modules',
        'src/styles/vendors/**/*',
        'src/styles/vendors'
    ]);
});

gulp.task('build:resources', function()
{
    var views = gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/'));

    var errors = gulp.src('src/errors/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/errors/'));

    var mailer = gulp.src('src/mailer/*.html')
        .pipe(gulp.dest('build/mailer/'));

    var options = {
        fontsDir: 'fonts/',
        cssDir: '../../src/styles/vendors',
        cssFilename: '_fonts.scss'
    };
    var font = gulp.src('src/styles/fonts.list')
        .pipe(googleWF(options))
        .pipe(gulp.dest('build/styles/'));

    var fonts = gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('build/styles/fonts/'));

    var fonts2 = gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*')
        .pipe(gulp.dest('build/styles/fonts/bootstrap/'));

    var text = gulp.src('node_modules/textangular/dist/textAngular.css')
        .pipe(concat('_textAngular.scss'))
        .pipe(gulp.dest('src/styles/vendors/'));

    var uploads = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/data/'));

    var uploads2 = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/players/'));

    var uploads3 = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/pages/'));

    var uploads4 = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/extra/'));

    var images = gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/'));

    return es.concat(views, errors, mailer, font, fonts, fonts2, text, uploads, uploads2, uploads3, uploads4, images);
});

gulp.task('build:styles', ['build:resources'], function()
{
    var vendors = gulp.src(['src/styles/*.scss', '!src/styles/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', errorHandler))
        .pipe(concat('vendors.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/styles/'));

    var styles = gulp.src(['src/modules/**/styles/*.scss', '!src/modules/**/styles/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src']
        }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/styles/'));

    return es.concat(vendors, styles);
});

gulp.task('build:jshint', function()
{
    return gulp.src([
        'src/**/*.js',
        '!src/**/_*.js'
    ]).pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build:scripts', ['build:modules', 'build:jshint'], function()
{
    return gulp.src([
        'src/scripts/*.js',
        '!src/scripts/_*.js'
    ]).pipe(include())
        .pipe(gulp.dest('build/scripts/'));
});

// TODO: Perhaps look into rearranging templateCache to
// a different file > dont think it is needed
gulp.task('build:modules', ['build:jshint'], folders(path_modules, function(module)
{
    var views = gulp.src(path.join(path_modules, module, '**/*.html'))
        .pipe(templates({
            module: 'mainapp',
            standalone: false,
            path: function(path, base){
                return path.replace(base, module + '/');
            }
        }));

    var scripts = gulp.src([
        path.join(path_modules, module, module + '.module.js'),
        path.join(path_modules, module, '**/*.js')
    ]).pipe(annotate());

    return es.concat(views, scripts)
        .pipe(concat(module + '.js'))
        .pipe(gulp.dest('build/modules'));
}));


// Production scripts
gulp.task('build:prod', [
    //'build:resources:prod',
    'build:styles:prod',
    'build:scripts:prod',
    'build:modules:prod'
], function() {
    // remove modules folder
    return del([
        'build/modules/**/*',
        'build/modules',
        'src/styles/vendors/**/*',
        'src/styles/vendors'
    ]);
});

gulp.task('build:resources:prod', function()
{
    var views = gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/'));

    var errors = gulp.src('src/errors/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/errors/'));

    var mailer = gulp.src('src/mailer/*.html')
        .pipe(gulp.dest('build/mailer/'));

    var options = {
        fontsDir: 'fonts/',
        cssDir: '../../src/styles/vendors',
        cssFilename: '_fonts.scss'
    };
    var font = gulp.src('src/styles/fonts.list')
        .pipe(googleWF(options))
        .pipe(gulp.dest('build/styles/'));

    var fonts = gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('build/styles/fonts/'));

    var fonts2 = gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*')
        .pipe(gulp.dest('build/styles/fonts/bootstrap/'));

    var text = gulp.src('node_modules/textangular/dist/textAngular.css')
        .pipe(concat('_textAngular.scss'))
        .pipe(gulp.dest('src/styles/vendors/'));

    var images = gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/'));

    return es.concat(views, errors, mailer, font, fonts, fonts2, text, images);
});

gulp.task('build:styles:prod', ['build:resources:prod'], function()
{
    var vendors = gulp.src(['src/styles/*.scss', '!src/styles/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', errorHandler))
        .pipe(autoprefixer())
        .pipe(uglifycss({
            "maxLineLen": 10000,
            "uglyComments": true
        }))
        .pipe(concat('vendors.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/styles/'));

    var styles = gulp.src(['src/modules/**/styles/*.scss', '!src/modules/**/styles/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src']
        }))
        .pipe(autoprefixer())
        .pipe(uglifycss({
            "maxLineLen": 10000,
            "uglyComments": true
        }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/styles/'));

    return es.concat(vendors, styles);
});

gulp.task('build:scripts:prod', ['build:modules:prod', 'build:jshint'], function()
{
    return gulp.src([
        'src/scripts/*.js',
        '!src/scripts/_*.js'
    ]).pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts/'));
});

gulp.task('build:modules:prod', ['build:jshint'], folders(path_modules, function(module)
{
    var views = gulp.src(path.join(path_modules, module, '**/*.html'))
        .pipe(templates({
            module: 'mainapp',
            standalone: false,
            path: function(path, base){
                return path.replace(base, module + '/');
            }
        }));

    var scripts = gulp.src([
        path.join(path_modules, module, module + '.module.js'),
        path.join(path_modules, module, '**/*.js')
    ]).pipe(annotate());

    return es.concat(views, scripts)
        .pipe(uglify())
        .pipe(concat( module == 'app' ? '_app.js': module + '.js'))
        .pipe(gulp.dest('build/modules'));
}));


// Error handling
var stdoutFormat = function(data)
{
    var prefix = '[' + 'server.js'.gray + ']';
    var lines = data.toString().split('\n');
    for(var i=0, ii=lines.length-1; i<ii; i++){
        util.log(prefix, lines[i].gray);
    }
};

var errorHandler = function(err)
{
    util.log('Error'.red);
    console.log('---\n', err.message.gray, '\n---');
    this.emit('end');
};