var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var webmake = require('../');
var basePath = path.join.bind(path, __dirname);

describe ('gulp-webmake', function () {

  it ('does not process empty files', function (done) {
    var ws = webmake();
    var file = new gutil.File({ contents: null });
    ws.on('data', function (content) {
      if (!content.isNull()) {
        throw new Error('Unexpectedly received data');
      }
      done();
    });
    ws.on('error', function (content) { throw new Error('Unexpectedly received an error'); });
    ws.on('end', function () { done(); });
    ws.write(file);
  });

  it ('emits errors', function (done) {
    var ws = webmake();
    var file = new gutil.File({
      base: basePath('./hello/'),
      path: basePath('./hello/invalid-dep.js'),
      contents: new Buffer('var is = require("unknown");', 'utf8')
    });
    ws.on('error', function (err) {
      assert.ok((/module \'\.\/a\-dep\' not found/i).test(err.message));
      done();
    });
    ws.on('data', function (content) { throw new Error('Unexpectedly received data'); });
    ws.write(file);
  });

  it ('bundles according to fixture', function (done) {
    var ws = webmake();
    var fixture = fs.readFileSync(basePath('fixtures', 'dep.js'), 'utf8');
    var file = new gutil.File({
      base: basePath('./hello/'),
      path: basePath('./hello/index.js'),
      contents: fs.readFileSync(basePath('./hello/index.js'))
    });
    ws.on('data', function (content) {
      var file = content.contents.toString();
      assert.equal(file, fixture, 'file matches fixture');
      done();
    });
    ws.write(file);
  });

  it ('bundles with a custom name according to fixture', function (done) {
    var ws = webmake({ name : 'customHello' });
    var fixture = fs.readFileSync(basePath('fixtures', 'dep-with-custom-name.js'), 'utf8');
    var file = new gutil.File({
      base: basePath('./hello/'),
      path: basePath('./hello/index.js'),
      contents: fs.readFileSync(basePath('./hello/index.js'))
    });
    ws.on('data', function (content) {
      var file = content.contents.toString();
      assert.equal(file, fixture, 'file matches fixture');
      done();
    });
    ws.write(file);
  });

});
