var gulp= require('gulp');
var less= require('gulp-less');
var connect= require('gulp-connect');
var concat=require('gulp-concat');
var uglify= require('gulp-uglify');
var rename= require('gulp-rename');
var minifyCSS= require('gulp-minify-css');
var imagemin= require('gulp-imagemin');

//set gulp concatenate function and uglify
gulp.task('scripts',function(){
  return gulp.src(['javascripts/jquery.js', 'javascripts/modernizr.js'])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())//javascripts uglify
  .pipe(rename('vendor.min.js'))// file rename
  .pipe(gulp.dest('dist/js'));
});

//set local server and livereload
gulp.task('server', function(){
      connect.server({
        root:'dist',//root
        livereload:true//live reload
      });
});

gulp.task('copy-index',function() {
  return gulp.src('index.html')
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
  });

gulp.task('images', function(){
  //copy all files in images
  return gulp.src('Images/**/*')
  .pipe(imagemin())// minify images
  .pipe(gulp.dest('dist/images'));
  //copy second level files in images
  //return gulp.src('Images/*/*').pipe(gulp.dest('dist/images'));
  //return gulp.src('Images/*').pipe(gulp.dest('dist/images'));
});

gulp.task('data',function(){
    return gulp.src(['xml/*.xml', 'json/*.json', '!json/secret-*.json']).pipe(gulp.dest('dist/data'));

});

gulp.task('bulid',['copy-index', 'images', 'data'], function(){
  console.log('complied!');
});

gulp.task('watch',function(){
  gulp.watch('index.html', ['copy-index']);
  gulp.watch('Images/**/*', ['images']);
  gulp.watch(['xml/*.xml', 'json/*.json', '!json/secret-*.json'], ['data']);
});


//  gulp.task('sass',function(){
  //    return gulp.src('stylesheets/**/*.scss')
    //  .pipe(sass())//process input read data
      //.pipe(gulp.dest('dist/css'));//output processed data
  //});
gulp.task('less',function(){
  return gulp.src('stylesheets/**/*.less')
  .pipe(less())//process input read data
  .pipe(minifyCSS())//minify css file
  .pipe(gulp.dest('dist/css'));//output processed data
});

gulp.task('default',['server','watch']);
