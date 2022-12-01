"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

var _reactNative = require("react-native");

function baseStyle(props) {
  return {
    bg: (0, _tools.mode)('muted.200', 'muted.700')(props),
    borderColor: (0, _tools.mode)('muted.300', 'muted.600')(props),
    borderWidth: 2,
    borderBottomWidth: 4,
    shadow: 1,
    borderRadius: 'md',
    px: 2,
    _text: {
      fontSize: 'sm',
      fontWeight: 'bold',
      fontFamily: _reactNative.Platform.OS === 'ios' ? 'Courier' : 'monospace'
    }
  };
}

const defaultProps = {};
var _default = {
  baseStyle,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=kbd.js.map