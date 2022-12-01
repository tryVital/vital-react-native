"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToken = useToken;

var _useTheme = require("./useTheme");

var _lodash = _interopRequireDefault(require("lodash.get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useToken(property, token, fallback) {
  const theme = (0, _useTheme.useTheme)();

  if (Array.isArray(token)) {
    let fallbackArr = [];

    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
    }

    return token.map((innerToken, index) => {
      var _fallbackArr$index;

      const path = "".concat(property, ".").concat(innerToken);
      return (0, _lodash.default)(theme, path, (_fallbackArr$index = fallbackArr[index]) !== null && _fallbackArr$index !== void 0 ? _fallbackArr$index : innerToken);
    });
  }

  const path = "".concat(property, ".").concat(token);
  return (0, _lodash.default)(theme, path, fallback !== null && fallback !== void 0 ? fallback : token);
}
//# sourceMappingURL=useToken.js.map