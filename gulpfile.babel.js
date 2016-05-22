import gulp from 'gulp';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import report from 'postcss-reporter';
import cssnext from 'postcss-cssnext';
import del from 'del';
import browserSync from 'browser-sync';

const bs = browserSync.create();

// Delete build directory
gulp.task('clean', () => del('./build'));

// Serve files
gulp.task('serve', ['build'], () => {
  bs.init({
    server: {
      baseDir: './build'
    }
  });
  gulp.watch('./src/**/*.css', ['styles']);
  gulp.watch('src/**/*.html', ['html']).on('change', bs.reload);
});

// Move HTML files to build directory
gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build/'));
});

// Run styles through postcss then move to build directory
gulp.task('styles', () => {
  const processors = [
    cssImport(),
    report(),
    cssnext()
  ];
  return gulp.src('./src/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build'))
    .pipe(bs.stream());
});

// Build
gulp.task('build', ['html', 'styles']);

gulp.task('default', ['build']);
