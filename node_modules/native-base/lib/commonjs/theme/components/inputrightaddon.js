"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = () => {
  return {
    // roundedRight: '4',
    p: '2',
    borderWidth: '1',
    borderLeftWidth: '0',
    borderRightRadius: 'sm',
    _text: {
      color: 'text.900',
      fontWeight: 400
    },
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'muted.50',
    borderColor: 'muted.300',
    _dark: {
      bg: 'muted.800',
      borderColor: 'muted.700',
      _text: {
        color: 'text.50'
      }
    }
  };
};

var _default = {
  baseStyle
};
exports.default = _default;
//# sourceMappingURL=inputrightaddon.js.map