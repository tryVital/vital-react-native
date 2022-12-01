"use strict";

var _colors = require("./../../theme/tools/colors");

describe('mode', () => {
  test('default', () => {
    expect((0, _colors.mode)('light', 'dark')({})).toBe('light');
  });
  test('light', () => {
    expect((0, _colors.mode)('light', 'dark')({
      colorMode: 'light'
    })).toBe('light');
  });
  test('dark', () => {
    expect((0, _colors.mode)('light', 'dark')({
      colorMode: 'dark'
    })).toBe('dark');
  });
});
//# sourceMappingURL=mode.test.js.map