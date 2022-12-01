"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  const {
    name,
    ...colorModeProps
  } = props;
  const bg = name ? (0, _tools.randomColor)({
    string: (0, _tools.getRandomString)(5) + name
  }) : 'gray.400';
  const borderColor = (0, _tools.mode)('gray.800', 'white')(colorModeProps);
  return {
    bg,
    borderColor,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'full',
    _text: {
      fontWeight: 600
    },
    _image: {
      borderRadius: 'full',
      alt: '--',
      _alt: {
        fontWeight: 600
      },
      style: {
        height: '100%',
        width: '100%'
      }
    }
  };
};

function getSize(size, fontSize) {
  return {
    width: size,
    height: size,
    _text: {
      fontSize: fontSize
    }
  };
}

const sizes = {
  'xs': getSize('6', '2xs'),
  'sm': getSize('8', 'xs'),
  'md': getSize('12', 'md'),
  'lg': getSize('16', 'xl'),
  'xl': getSize('24', '3xl'),
  '2xl': getSize('32', '5xl')
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
//# sourceMappingURL=avatar.js.map