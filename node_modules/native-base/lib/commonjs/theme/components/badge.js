"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  space: 1,
  px: '2',
  py: '0.5',
  alignItems: 'center',
  _text: {
    fontSize: 'xs',
    fontWeight: 'medium'
  }
};

function variantSolid(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    _text: {
      color: 'text.50'
    },
    _icon: {
      color: 'text.50'
    },
    bg: "".concat(colorScheme, ".600"),
    borderWidth: '1',
    borderColor: 'transparent',
    borderRadius: '2'
  };
}

function variantSubtle(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    _text: {
      color: "".concat(colorScheme, ".900")
    },
    _icon: {
      color: "".concat(colorScheme, ".900")
    },
    bg: "".concat(colorScheme, ".100"),
    _dark: {
      bg: "".concat(colorScheme, ".300")
    },
    borderWidth: '1',
    borderRadius: '2',
    borderColor: 'transparent'
  };
}

function variantOutline(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    _text: {
      color: "".concat(colorScheme, ".600")
    },
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    borderColor: "".concat(colorScheme, ".600"),
    _dark: {
      _text: {
        color: "".concat(colorScheme, ".300")
      },
      _icon: {
        color: "".concat(colorScheme, ".300")
      },
      borderColor: "".concat(colorScheme, ".300")
    },
    borderRadius: '2',
    borderWidth: '1'
  };
}

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline
};
const defaultProps = {
  variant: 'subtle',
  colorScheme: 'muted',
  size: 'md'
};
var _default = {
  baseStyle,
  variants,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=badge.js.map