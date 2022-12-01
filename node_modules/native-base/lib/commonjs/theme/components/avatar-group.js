"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function baseStyle({
  isVertical
}) {
  return {
    flexDirection: isVertical ? 'column-reverse' : 'row-reverse',
    space: -4,
    _avatar: {
      borderWidth: 2
    },
    _hiddenAvatarPlaceholder: {
      _text: {
        color: 'text.50'
      }
    },
    _light: {
      _avatar: {
        borderColor: 'muted.50'
      },
      _hiddenAvatarPlaceholder: {
        bg: 'gray.600'
      }
    },
    _dark: {
      _avatar: {
        borderColor: 'muted.900'
      },
      _hiddenAvatarPlaceholder: {
        bg: 'gray.600'
      }
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