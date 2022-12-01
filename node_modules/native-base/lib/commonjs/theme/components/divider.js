"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function baseStyle(props) {
  const {
    orientation,
    thickness
  } = props;
  const orientationProps = orientation === 'vertical' ? {
    width: "".concat(thickness, "px"),
    // handle for web : To be discussed
    height: '100%'
  } : {
    width: '100%',
    height: "".concat(thickness, "px")
  };
  return {
    bg: 'muted.300',
    _dark: {
      bg: 'muted.600'
    },
    ...orientationProps
  };
}

var _default = {
  baseStyle,
  defaultProps: {
    orientation: 'horizontal',
    thickness: '1'
  }
};
exports.default = _default;
//# sourceMappingURL=divider.js.map