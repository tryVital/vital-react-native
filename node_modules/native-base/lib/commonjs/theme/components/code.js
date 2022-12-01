"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _badge = _interopRequireDefault(require("./badge"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  variants,
  defaultProps
} = _badge.default;
const baseStyle = {
  _text: {
    fontFamily: _reactNative.Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 'sm'
  },
  borderRadius: 'sm',
  px: 2,
  py: 1
};
var _default = {
  baseStyle,
  variants,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=code.js.map