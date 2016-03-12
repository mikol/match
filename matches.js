(function (context) {
/*jscs:disable validateIndentation*//*jscs:enable validateIndentation*/
// -----------------------------------------------------------------------------

'use strict';

var id = 'matches';
var dependencies = ['classify'];

function factory(classify) {
  /**
   * Tests whether `value` matches regular expression `regexp`. If `regexp` is
   * not a regular expression object, it will be coerced to a string and then,
   * after any regular expression control characters have been escaped,
   * converted to a regular expression object. If `regexp` is already a regular
   * expression pattern in the form of a string and should not be escaped, use
   * the `RegExp()` constructor to create a regular expression object (for
   * example, `matches(new RegExp(aRegExpString), aValue)`).
   *
   * @param {(RegExp|*)} - The regular expression (or any value, which will be
   *     converted to a regular expression) to compare with `value`.
   * @param {*} value - The value to compare with `regexp`.
   *
   * @return {!boolean} `true` if `value` matches `regexp`; `false` otherwise.
   */
  return function matches(regexp, value) {
    if (classify(regexp) !== 'regexp') {
      regexp = new RegExp((regexp + '').replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'));
    }

    return regexp.test(value);
  };
}

// -----------------------------------------------------------------------------
var n = dependencies.length;
var o = 'object';
var r = /([^-_\s])[-_\s]+([^-_\s])/g;
function s(m, a, b) { return a + b.toUpperCase(); }
context = typeof global === o ? global : typeof window === o ? window : context;
if (typeof define === 'function' && define.amd) {
  define(dependencies, function () {
    return factory.apply(context, [].slice.call(arguments));
  });
} else if (typeof module === o && module.exports) {
  for (; n--;) {dependencies[n] = require(dependencies[n]);}
  module.exports = factory.apply(context, dependencies);
} else {
  for (; n--;) {dependencies[n] = context[dependencies[n]];}
  context[id.replace(r, s)] = factory.apply(context, dependencies);
}
}(this));
