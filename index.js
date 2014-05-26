var through = require('through');
var gutil = require('gulp-util');
var webmake = require('webmake');
var util = require('util');
var path = require('path');
var PluginError = gutil.PluginError;

module.exports = function Webmake (options) {
  options = options || {};

  var defaultOptions = {};
  options = util._extend(defaultOptions, options);

  return through(_process, gutil.noop);

  function _process (file) {
    var self = this;
    if (file.isNull()) return self.push(null);

    function callback (err, contents) {
      if (err) return self.emit('error',new gutil.PluginError('gulp-webmake', err, { showStack : true }));
      var output = file.clone(file);
      output.contents = new Buffer(contents);
      self.emit('data', output);
    }
    if (file.isStream()) webmake(s, options, callback);
    else webmake(file.path, options, callback);
  }
}
