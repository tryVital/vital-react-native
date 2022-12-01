"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  return {
    color: (0, _tools.mode)('muted.800', 'muted.100')(props)
  };
};

const sizes = {
  'xxs': 2,
  'xs': 4,
  'sm': 6,
  'md': 8,
  'lg': 10,
  'xl': 12,
  '2xl': 16,
  '3xl': 20,
  '4xl': 24,
  '5xl': 32,
  '6xl': 64
};
const defaultProps = {
  size: 'md'
};
var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=icon.js.map