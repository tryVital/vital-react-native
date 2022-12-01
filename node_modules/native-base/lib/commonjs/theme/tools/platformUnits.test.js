"use strict";

var _reactNative = require("react-native");

var _base = _interopRequireDefault(require("../base"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('platform units on native', () => {
  it('should convert px to absolute on native', () => {
    _reactNative.Platform.OS = 'ios';
    const newTheme = { ..._base.default
    };
    newTheme.space = {
      xs: '1px'
    };
    const convertedTheme = (0, _utils.platformSpecificSpaceUnits)(newTheme);
    expect(convertedTheme.space).toEqual({
      xs: 1
    });
  });
  it('should convert rem to absolute on native', () => {
    _reactNative.Platform.OS = 'ios';
    const newTheme = { ..._base.default
    };
    newTheme.space = {
      xs: '2rem'
    };
    const convertedTheme = (0, _utils.platformSpecificSpaceUnits)(newTheme);
    expect(convertedTheme.space).toEqual({
      xs: 32
    });
  });
});
describe('platform units on web', () => {
  it('should not convert px to rem on web', () => {
    _reactNative.Platform.OS = 'web';
    const newTheme = { ..._base.default
    };
    newTheme.space = {
      xs: '23px'
    };
    const convertedTheme = (0, _utils.platformSpecificSpaceUnits)(newTheme);
    expect(convertedTheme.space).toEqual({
      xs: '23px'
    });
  });
  it('should convert absolute to rem on web', () => {
    _reactNative.Platform.OS = 'web';
    const newTheme = { ..._base.default
    };
    newTheme.space = {
      xs: 23
    };
    const convertedTheme = (0, _utils.platformSpecificSpaceUnits)(newTheme);
    expect(convertedTheme.space).toEqual({
      xs: '1.4375rem'
    });
  });
});
//# sourceMappingURL=platformUnits.test.js.map