"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendTheme = extendTheme;

var _theme = require("./../theme");

var _lodash = _interopRequireDefault(require("lodash.mergewith"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFunction(value) {
  return typeof value === 'function';
}

function extendTheme(overrides, ...restOverrides) {
  function customizer(source, override) {
    if (isFunction(source)) {
      return (...args) => {
        const sourceValue = source(...args);
        const overrideValue = isFunction(override) ? override(...args) : override;
        return (0, _lodash.default)({}, sourceValue, overrideValue, customizer);
      };
    }

    return undefined;
  }

  const finalOverrides = [overrides, ...restOverrides].reduce((prevValue, currentValue) => {
    return (0, _lodash.default)({}, prevValue, currentValue, customizer);
  }, _theme.theme);
  return finalOverrides;
}
//# sourceMappingURL=extendTheme.js.map