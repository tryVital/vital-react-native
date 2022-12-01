"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("./../tools");

const baseStyle = props => {
  const {
    name
  } = props;
  const bg = name ? (0, _tools.randomColor)({
    string: (0, _tools.getRandomString)(5) + name
  }) : 'gray.400';
  return {
    bg,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'full',
    _text: {
      fontWeight: 600,
      color: 'text.50'
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
    },
    borderColor: 'gray.800',
    _dark: {
      borderColor: 'white'
    }
  };
};

function getSize(size, fontSize, badgeSize) {
  return {
    width: size,
    height: size,
    _text: {
      fontSize: fontSize
    },
    _badgeSize: badgeSize
  };
}

const sizes = {
  'xs': getSize('6', '2xs', '2'),
  'sm': getSize('8', 'xs', '3'),
  'md': getSize('12', 'md', '4'),
  'lg': getSize('16', 'xl', '5'),
  'xl': getSize('24', '3xl', '6'),
  '2xl': getSize('32', '5xl', '7')
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