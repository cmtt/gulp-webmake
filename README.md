# gulp-webmake
> Bundles CommonJS and Node.JS modules for web browsers using Gulp.

## Usage

Install this plugin using npm:

```shell
npm install --save-dev gulp-webmake
```

In order to save the bundle lib/index.js and lib/client.js in build/, add this to your `gulpfile.js`:

```javascript
var webmake = require('gulp-webmake');

gulp.task('templates', function(){
  gulp.src([
    'lib/index.js',
    'lib/client.js'
  ])
  .pipe(webmake())
  .pipe(gulp.dest('build/'));
});
```

## Options

The gulp-webmake plugin takes an optional options object which is passed through to webmake.

Please refer to the [webmake documentation](https://github.com/medikoo/modules-webmake) for further details as well as why webmake could be an alternative to [https://github.com/substack/node-browserify](browserify).

## Licence

MIT
