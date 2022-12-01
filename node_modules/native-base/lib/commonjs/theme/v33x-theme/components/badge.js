"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = {
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
    bg: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".300"))(props),
    _text: {
      color: (0, _tools.mode)("coolGray.100", "coolGray.800")(props)
    },
    borderWidth: '1',
    borderColor: 'transparent',
    borderRadius: '2'
  };
}

function variantSubtle(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    bg: (0, _tools.mode)("".concat(colorScheme, ".200"), "".concat(colorScheme, ".700"))(props),
    _text: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".200"))(props)
    },
    borderWidth: '1',
    borderRadius: '2',
    borderColor: 'transparent'
  };
}

function variantOutline(props) {
  const colorScheme = (0, _tools.getColorScheme)(props);
  return {
    borderColor: (0, _tools.mode)("".concat(colorScheme, ".500"), "".concat(colorScheme, ".400"))(props),
    _text: {
      color: (0, _tools.mode)("".concat(colorScheme, ".500"), "".concat(colorScheme, ".400"))(props)
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
  colorScheme: 'coolGray'
};
var _default = {
  baseStyle,
  variants,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=badge.js.map