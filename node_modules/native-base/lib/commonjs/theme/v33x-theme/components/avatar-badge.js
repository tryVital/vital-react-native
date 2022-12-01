"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

function baseStyle(props) {
  return {
    borderRadius: 'full',
    borderWidth: 2,
    borderColor: (0, _tools.mode)('light.50', 'gray.800')(props),
    bg: (0, _tools.mode)('gray.600', 'light.100')(props),
    size: 3,
    position: 'absolute',
    right: 0,
    bottom: 0
  };
}

var _default = {
  baseStyle
};
exports.default = _default;
//# sourceMappingURL=avatar-badge.js.map