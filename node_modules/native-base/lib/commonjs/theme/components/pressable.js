"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = props => {
  const {
    primary
  } = props.theme.colors;
  return {
    _focusVisible: {
      _web: {
        style: {
          outlineWidth: 0,
          boxShadow: "".concat(primary[400], " 0px 0px 0px 2px")
        }
      }
    },
    _dark: {
      _focusVisible: {
        _web: {
          style: {
            outlineWidth: 0,
            boxShadow: "".concat(primary[500], " 0px 0px 0px 2px")
          }
        }
      }
    }
  };
};

var _default = {
  baseStyle,
  defaultProps: {}
};
exports.default = _default;
//# sourceMappingURL=pressable.js.map