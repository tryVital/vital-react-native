"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

var _reactNative = require("react-native");

const baseStyle = props => {
  const colorScheme = (0, _tools.getColorScheme)(props); //TODO: Use of Platform can be removed

  return {
    _disabled: {
      opacity: 0.4
    },
    _invalid: {
      borderWidth: 1,
      borderRadius: 16,
      borderColor: 'danger.600'
    },
    offTrackColor: (0, _tools.mode)(_reactNative.Platform.OS !== 'ios' ? 'gray.400' : 'gray.200', _reactNative.Platform.OS !== 'ios' ? 'gray.700' : 'gray.600')(props),
    onTrackColor: (0, _tools.mode)(_reactNative.Platform.OS !== 'ios' ? "".concat(colorScheme, ".300") : "".concat(colorScheme, ".500"), _reactNative.Platform.OS !== 'ios' ? "".concat(colorScheme, ".700") : "".concat(colorScheme, ".500"))(props),
    onThumbColor: (0, _tools.mode)(_reactNative.Platform.OS !== 'ios' ? "".concat(colorScheme, ".600") : 'white', _reactNative.Platform.OS !== 'ios' ? "".concat(colorScheme, ".500") : 'white')(props),
    offThumbColor: (0, _tools.mode)(_reactNative.Platform.OS !== 'ios' ? 'gray.100' : 'white', _reactNative.Platform.OS !== 'ios' ? 'gray.200' : 'white')(props)
  };
};

const sizes = {
  sm: {
    style: {
      transform: [{
        scale: 0.75
      }]
    }
  },
  md: {},
  lg: {
    style: {
      transform: [{
        scale: 1.25
      }]
    },
    margin: 1
  }
};
const defaultProps = {
  size: 'md',
  colorScheme: 'primary'
};
var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=switch.js.map