"use strict";

var _utils = require("./../../theme/tools/utils");

var _theme = require("../../theme");

describe('mode', () => {
  test('Empty array', () => {
    expect((0, _utils.hasValidBreakpointFormat)([], _theme.theme.breakpoints)).toBe(false);
  });
  test('Array', () => {
    expect((0, _utils.hasValidBreakpointFormat)([1, 2], _theme.theme.breakpoints)).toBe(true);
  });
  test('Valid Object', () => {
    expect((0, _utils.hasValidBreakpointFormat)({
      base: 1,
      sm: 2
    }, _theme.theme.breakpoints)).toBe(true);
  });
  test('Invalid Object', () => {
    expect((0, _utils.hasValidBreakpointFormat)({
      base: 1,
      sm: 2,
      ab: 1
    }, _theme.theme.breakpoints)).toBe(false);
  });
});
//# sourceMappingURL=hasValidBreakpointFormat.test.js.map