/**
 * Created by xuanjiu on 17/1/19.
 */
var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
// var buildConfig = require("./webpack.config.build");
var path = require('path');
del = require('del');

gulp.task('clean', function(){
  del([
      './assets/**/*', 
    ]);
  console.log('clean /assets/ folder.');
});

gulp.task('copy', function(){
  gulp.src(['./src/tagManage/tagManage.html'])
    .pipe(gulp.dest('./assets/'));
  gulp.src('./src/img/*')
    .pipe(gulp.dest('dist/img'));  
  gulp.src(['./src/AdminLTE/fonts/*'])
    .pipe(gulp.dest('./dist/fonts/'));
  gulp.src(['./src/platform/platformBackend.html'])
    .pipe(gulp.dest('./dist/'));
  gulp.src(['./src/platform/style/vendor.min.css'])
    .pipe(gulp.dest('./dist/style/'));
  return gulp.src(['./src/tagManage/style/*'])
    .pipe(gulp.dest('./assets/style/'));
  
});



gulp.task('dev', ['copy'], function() {
  config.entry.tagManage.unshift('webpack-dev-server/client?http://localhost:8086/', 'webpack/hot/only-dev-server');

  var compiler = webpack(config);
  var server = new webpackDevServer(compiler, {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, './'),
    // match the output path

    publicPath: '/assets/',
    // match the output `publicPath`

    stats: { colors: true },

    proxy: {
      "/cms/**/*": {
        target: "http://192.168.51.22/"
      },
      '/cdn/**/*': {
        target: 'http://192.168.51.22/'
      }
    },
    // proxy: {
    //   '/cms/*': {
    //     target: 'http://192.168.51.22/'
    //   },
    //   '/cdn/*': {
    //     target: 'http://192.168.51.22/'
    //   }
    // }
  });
  server.listen(8086);
});

// gulp.task('build', ['cleanImage', 'copyImage'], function() {
//   webpack(buildConfig, function(err, stats) { console.log(err) });
// });


// gulp.task('cleanImage', function(){
//   del([
//       './build/img/*', 
//     ]);
//   console.log('clean /build/img folder.');
// });

// 缩小PNG，JPEG，GIF和SVG图像
// gulp.task('copyImage', function(){
//   return gulp.src([
//     './src/img/*',
//   ])
//     .pipe(gulp.dest('./build/img/'));
// });
// gulp.task('copyImage', ['clean'], function(){
//   return gulp.src(['./src/images/**/*'])
//     .pipe(gulp.dest('./build/images/'));
// });
