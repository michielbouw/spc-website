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

// Gulp Production plugins
//var uglify      = require('gulp-uglify');
//var htmlmin     = require('gulp-htmlmin');
//var autoprefixer = require('gulp-autoprefixer');

// Modules path
var path_modules = 'src/modules/';

// Default task
gulp.task('default', ['build'], function()
{
    gulp.start.apply(gulp, ['server:watch', 'server:start']);
});

// production
gulp.task('heroku', ['build:prod']);

gulp.task('build:resources:prod', function()
{
    var views = gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));

    var errors = gulp.src('src/errors/*.html')
        .pipe(gulp.dest('build/errors/'));

    var fonts = gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('build/styles/fonts/'));

    var text = gulp.src('node_modules/textAngular/src/textAngular.css')
        .pipe(gulp.dest('build/styles/vendors/textAngular.css'));

    var images = gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/'));

    return es.concat(views, errors, fonts, text, images);
});

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

gulp.task('build', [
    'build:resources',
    'build:styles',
    'build:scripts',
    'build:modules'
], function(){
    livereload.reload();
});

gulp.task('build:prod', [
    'build:resources:prod',
    'build:styles',
    'build:scripts',
    'build:modules'
]);

gulp.task('build:resources', function()
{
    var views = gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));

    var errors = gulp.src('src/errors/*.html')
        .pipe(gulp.dest('build/errors/'));

    var fonts = gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('build/styles/fonts/'));

    var text = gulp.src('node_modules/textAngular/src/*.css')
        .pipe(gulp.dest('build/styles/vendors/'));

    var uploads = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/data/'));

    var uploads2 = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/players/'));

    var uploads3 = gulp.src('src/images/blank-avatar.png')
        .pipe(gulp.dest('media/pages/'));

    var images = gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/'));

    return es.concat(views, errors, fonts, text, uploads, uploads2, uploads3, images);
});

gulp.task('build:styles', function()
{
    var vendors = gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', errorHandler))
        .pipe(gulp.dest('build/styles/'));

    var styles = gulp.src(['src/modules/**/styles/*.scss', '!src/modules/**/styles/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src']
        }))
        .pipe(concat('app.css'))
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

// TODO: Production scripts

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