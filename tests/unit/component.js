define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var hello = require('index');

  registerSuite({
    name: 'hello',
    test: function () {
      assert.strictEqual(hello.greet('Murray'), 'Hello, Murray!',
        'hello.greet should return a greeting for the person named in the first argument');
      assert.strictEqual(hello.greet(), 'Hello, world!',
        'hello.greet with no arguments should return a greeting to "world"');
    }
  });
});
