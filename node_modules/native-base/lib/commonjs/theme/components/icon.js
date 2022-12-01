"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = () => {
  return {
    color: 'muted.500',
    _dark: {
      color: 'muted.400'
    }
  };
};

const sizes = {
  '2xs': 2,
  'xs': 3,
  'sm': 4,
  'md': 5,
  'lg': 6,
  'xl': 7,
  '2xl': 8,
  '3xl': 9,
  '4xl': 10,
  '5xl': 12,
  '6xl': 16
};
const defaultProps = {
  size: 'sm'
};
var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=icon.js.map