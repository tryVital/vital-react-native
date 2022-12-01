"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const baseStyle = {
  multiline: true,
  p: '2',
  totalLines: 4,
  h: _reactNative.Platform.select({
    ios: 20
  }),
  textAlignVertical: 'top'
};
var _default = {
  baseStyle
};
exports.default = _default;
//# sourceMappingURL=textarea.js.map