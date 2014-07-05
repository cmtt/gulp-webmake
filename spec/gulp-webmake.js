var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var webmake = require('../');

describe ('gulp-webmake"', function () {

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
      base: path.join(__dirname, './hello/'),
      path: path.join(__dirname, './hello/invalid-dep.js'),
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
    var fixtures = fs.readFileSync(path.join(__dirname, './fixtures/dep.js'),'utf8');
    var ws = webmake();

    ws.on('data', function (content) {
      var file = content.contents.toString();
      var fixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'dep.js'), 'utf8');
      assert.equal(file, fixture, 'file matches fixture');
      done();
    });

    var file = new gutil.File({
      base: path.join(__dirname, './hello/'),
      path: path.join(__dirname, './hello/index.js'),
      contents: fs.readFileSync(path.join(__dirname, './hello/index.js'))
    });

    ws.write(file);
  });

});
