 var through2 = require('through2');
var gutil = require('gulp-util');
var webmake = require('webmake');
var util = require('util');
var path = require('path');
var PluginError = gutil.PluginError;

module.exports = function(options) {
  var defaultOptions = {};
  options = util._extend(defaultOptions, options || {});

  return through2.obj(function(file, enc, next) {
    var self = this;

    if (file.isNull()) {
      self.push(file);
      return next();
    }

    if (file.isStream()) {
      self.emit('error', new PluginError('gulp-webmake', 'Streaming not supported.'));
      return next();
    }

    webmake(file.path, options, function(err, content) {
      if (err) {
        self.emit('error', new PluginError('gulp-webmake', err, { showStack : true }));
      } else {
        file.contents = new Buffer(content);
        file.path = gutil.replaceExtension(file.path, '.js');
        self.push(file);
      }
      next();
    });
  });
};
