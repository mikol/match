'use strict';

require('criteria'); /* globals scope, test */

var is = require('is');
var matches = require('../match');

scope('`matches()` matches correctly.',
function () {
  test('Works without any arguments.',
  function (must) {
    must.true(function () {
      return matches();
    });
  });

  test("'' matches `new String()`.",
  function (must) {
    must.true(function () {
      return matches(new String(), '');
    });
  });

  test("`true` matches 'true'.",
  function (must) {
    must.true(function () {
      return matches('true', true);
    });
  });

  test("`true` does not match /^ true $/.",
  function (must) {
    must.true(function () {
      return !matches(/^ true $/, true);
    });
  });

  test("`false` matches /^false$/.",
  function (must) {
    must.true(function () {
      return matches(/^false$/, false);
    });
  });

  test("'foo bar biz baz' matches 'bar'.",
  function (must) {
    must.true(function () {
      return matches('bar', 'foo bar biz baz');
    });
  });

  test("'foo biz baz' does not match 'bar'.",
  function (must) {
    must.true(function () {
      return !matches('bar', 'foo biz baz');
    });
  });

  test("'Format ${0} text' matches /[\\^$*+?.()|[\]{}]/.",
  function (must) {
    must.true(function () {
      return matches(/[\\^$*+?.()|[\]{}]/, 'Format ${0} string.');
    });
  });

  test("'Format %c text' does not match /[\\^$*+?.()|[\]{}]/.",
  function (must) {
    must.true(function () {
      return !matches(/[\\^$*+?.()|[\]{}]/, 'Format %c text');
    });
  });

  test("`{}.constructor` matches `Object`.",
  function (must) {
    must.true(function () {
      return matches(Object, {}.constructor);
    });
  });
});
