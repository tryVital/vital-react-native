"use strict";

var _utils = require("./../../theme/tools/utils");

var _theme = require("../../theme");

describe('mode', () => {
  // const theme = useTheme();
  test('First array value', () => {
    expect((0, _utils.findLastValidBreakpoint)([1, 2], _theme.theme.breakpoints, 0)).toBe(1);
  });
  test('Middle array value', () => {
    expect((0, _utils.findLastValidBreakpoint)([1, 2, 3], _theme.theme.breakpoints, 1)).toBe(2);
  });
  test('Last array value', () => {
    expect((0, _utils.findLastValidBreakpoint)([1, 2, 3], _theme.theme.breakpoints, 2)).toBe(3);
  });
  test('First Object value', () => {
    expect((0, _utils.findLastValidBreakpoint)({
      base: 1,
      sm: 2,
      lg: 3
    }, _theme.theme.breakpoints, 0)).toBe(1);
  });
  test('Middle object value 1', () => {
    expect((0, _utils.findLastValidBreakpoint)({
      base: 1,
      sm: 2,
      lg: 3
    }, _theme.theme.breakpoints, 1)).toBe(2);
  });
  test('Middle object value 2', () => {
    expect((0, _utils.findLastValidBreakpoint)({
      base: 1,
      sm: 2,
      lg: 3
    }, _theme.theme.breakpoints, 2)).toBe(2);
  });
  test('Last object value', () => {
    expect((0, _utils.findLastValidBreakpoint)({
      base: 1,
      sm: 2,
      lg: 3
    }, _theme.theme.breakpoints, 3)).toBe(3);
  });
});
//# sourceMappingURL=findLastValidBreakpoint.test.js.map