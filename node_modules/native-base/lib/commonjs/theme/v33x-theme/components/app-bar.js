"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  let colorScheme = (0, _tools.getColorScheme)(props);
  return {
    bg: (0, _tools.mode)("".concat(colorScheme, ".500"), "".concat(colorScheme, ".300"))(props),
    px: 2
  };
};

const defaultProps = {
  colorScheme: 'primary'
};
var _default = {
  baseStyle,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=app-bar.js.map