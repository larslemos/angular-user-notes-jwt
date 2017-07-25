var gulp = require('gulp');
var config = require('./gulp.config')();
var plug = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;
var $ = require('gulp-load-plugins')({lazy: true});


var source = [
    'client/**/*.module.js',
    'client/app/*.js',
    'server/**/*.js',
    './*.js'
];

// gulp.task('ngAnnotateTest', function() {
//     return gulp
//         .src(source)
//         .pipe(plug.ngAnnotate({add: true, single_quotes: true}))
//         .pipe(plug.rename(function(path) {
//             path.extname = '.annotated.js';
//         }))
//         .pipe(gulp.dest('./build'));
//         .pipe(plug())
// });

// gulp.task('inject', );

gulp.task('serve-dev', ['hint'], function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer, //TODO app.js
        delayTime: 1,
        env: {
          'PORT': port,
          'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server] //TODO define the files to restart on
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
          console.info("NODEMON restarted");
          console.info('Files changed on restart: \n'+ev)
        })
        .on('start', function() {
          console.info('')
        })
        .on('crash', function() { })
        .on('exit', function() { });
});

gulp.task('hint', function(){
    console.info('ANALYZING SOURCE WITH JSHINT AND JSCS');
    return gulp
        .src(source)
        .pipe(plug.jshint('./.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish'), {verbose: true});
});

gulp.task('watch', function(){
    return gulp
        .watch(source, ['hint'])
        .on('change', function(event) {
          console.log('*** File '+event.path + ' was '+event.type+' , running tasks...');
        });
});
