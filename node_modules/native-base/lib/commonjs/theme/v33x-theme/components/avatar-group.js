"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

function baseStyle({
  isVertical,
  ...props
}) {
  return {
    flexDirection: isVertical ? 'column-reverse' : 'row-reverse',
    space: -4,
    _avatar: {
      borderColor: (0, _tools.mode)('gray.50', 'gray.800')(props),
      borderWidth: 2
    },
    _hiddenAvatarPlaceholder: {
      bg: (0, _tools.mode)('gray.600', 'gray.100')(props)
    }
  };
}

var _default = {
  baseStyle,
  defaultProps: {
    isVertical: false
  }
};
exports.default = _default;
//# sourceMappingURL=avatar-group.js.map