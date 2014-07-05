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

## Changelog

0.0.2 - 07/05/2014

 - upgrade to through2
 - throws an error on streams (currently not supported by webmake)
 - improved error handling using PluginError
 - push null file instead of null literal when file.isNull()
 - re-use file and push it so it can also be processed
 - return next() so the next gulp plugin gets run

0.0.1 - 05/26/2014

Initial release.

## Contributors

- [joeyespo](https://github.com/joeyespo) made the transition to [through2](https://github.com/rvagg/through2)

## Licence

MIT
