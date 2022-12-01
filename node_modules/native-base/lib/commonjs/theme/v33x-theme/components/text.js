"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  return {
    color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props),
    fontWeight: '400',
    fontFamily: 'body',
    fontStyle: 'normal',
    fontSize: 'sm',
    letterSpacing: 'md',
    lineHeight: 'lg'
  };
};

const defaultProps = {};
var _default = {
  baseStyle,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=text.js.map