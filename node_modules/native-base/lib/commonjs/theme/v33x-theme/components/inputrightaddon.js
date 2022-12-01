"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  return {
    borderLeftWidth: '0',
    roundedRight: '4',
    bg: (0, _tools.mode)('gray.50', 'gray.700')(props),
    p: '2',
    borderColor: (0, _tools.mode)('gray.300', 'gray.600')(props),
    borderWidth: '1',
    _text: {
      color: (0, _tools.mode)('muted.400', 'muted.500')(props),
      fontWeight: 600
    },
    alignItems: 'center',
    justifyContent: 'center'
  };
};

var _default = {
  baseStyle
};
exports.default = _default;
//# sourceMappingURL=inputrightaddon.js.map