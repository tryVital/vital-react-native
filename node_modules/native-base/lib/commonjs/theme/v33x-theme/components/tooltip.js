"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  return {
    bg: (0, _tools.mode)("gray.700", "gray.300")(props),
    py: 1,
    px: 2,
    rounded: 'sm',
    shadow: 1,
    _text: {
      color: (0, _tools.mode)("gray.300", "gray.700")(props),
      fontSize: 'sm'
    }
  };
};

const Tooltip = {
  baseStyle
};
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map