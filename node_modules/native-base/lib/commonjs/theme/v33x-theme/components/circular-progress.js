"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const sizes = {
  'xs': {
    height: 6,
    width: 6
  },
  'sm': {
    height: 8,
    width: 8
  },
  'md': {
    height: 16,
    width: 16
  },
  'lg': {
    height: 20,
    width: 20
  },
  'xl': {
    height: 24,
    width: 24
  },
  '2xl': {
    height: 32,
    width: 32
  }
};
const defaultProps = {
  thickness: 8,
  colorScheme: 'primary',
  size: 'lg'
};

function baseStyle(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".500"))(props),
    trackColor: (0, _tools.mode)("".concat(colorScheme, ".200"), "".concat(colorScheme, ".800"))(props)
  };
}

var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=circular-progress.js.map