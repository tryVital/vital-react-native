"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

const baseStyle = () => {
  return {
    py: 1,
    px: 2,
    shadow: 6,
    rounded: 'sm',
    _text: {
      fontSize: 'sm',
      color: "text.50"
    },
    bg: "muted.800",
    _dark: {
      bg: "muted.50",
      _text: {
        color: "text.900"
      }
    }
  };
};

const Tooltip = {
  baseStyle
};
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map