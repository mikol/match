'use strict';

require('criteria'); /* globals scope, test */

var is = require('is');
var match = require('../match');

scope('`match()` matches correctly.',
function () {
  test('Works without any arguments.',
  function (must) {
    must.true(function () {
      return match();
    });
  });

  test("'' matches `new String()`.",
  function (must) {
    must.true(function () {
      return match('', new String());
    });
  });

  test("`true` matches 'true'.",
  function (must) {
    must.true(function () {
      return match(true, 'true');
    });
  });

  test("`true` does not match /^ true $/.",
  function (must) {
    must.true(function () {
      return !match(true, /^ true $/);
    });
  });

  test("`false` matches /^false$/.",
  function (must) {
    must.true(function () {
      return match(false, /^false$/);
    });
  });

  test("'foo bar biz baz' matches 'bar'.",
  function (must) {
    must.true(function () {
      return match('foo bar biz baz', 'bar');
    });
  });

  test("'foo biz baz' does not match 'bar'.",
  function (must) {
    must.true(function () {
      return !match('foo biz baz', 'bar');
    });
  });

  test("'Format ${0} text' matches /[\\^$*+?.()|[\]{}]/.",
  function (must) {
    must.true(function () {
      return match('Format ${0} string.', /[\\^$*+?.()|[\]{}]/);
    });
  });

  test("'Format %c text' does not match /[\\^$*+?.()|[\]{}]/.",
  function (must) {
    must.true(function () {
      return !match('Format %c text', /[\\^$*+?.()|[\]{}]/);
    });
  });

  test("`{}.constructor` matches `Object`.",
  function (must) {
    must.true(function () {
      return match({}.constructor, Object);
    });
  });
});
