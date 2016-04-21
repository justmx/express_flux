var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify'); //Bundle JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');


gulp.task('live-server', function() {
	var server = new LiveServer('server/main.js');
	server.start();
})


gulp.task('copy', function() {
		gulp.src(['app/*.css'])
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./.tmp'));
});

gulp.task('bundle',['copy'], function() {
	return browserify({
			entries: 'app/main.jsx',
			debug: true
		})
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('app.js'))
		.pipe(gulp.dest('./.tmp'));
});

gulp.task('serve', ['bundle','live-server'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:7777",
		port: 9001
	})
})