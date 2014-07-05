var through = require('through');
var gutil = require('gulp-util');
var webmake = require('webmake');
var util = require('util');
var path = require('path');
var PluginError = gutil.PluginError;

module.exports = function(options) {
  var defaultOptions = {};
  options = util._extend(defaultOptions, options || {});

  return through(function(file) {
    var self = this;

    if (file.isNull()) {
      return self.push(null);
    }

    if (file.isStream()) {
      self.emit('error', new PluginError('gulp-webmake', 'Streaming not supported.'));
      return next();
    }

    webmake(file.path, options, function(err, contents) {
      if (err) {
        return self.emit('error', new PluginError('gulp-webmake', err, { showStack: true }));
      }
      var output = file.clone(file);
      output.contents = new Buffer(contents);
      self.emit('data', output);
    });
  }, gutil.noop);
};
