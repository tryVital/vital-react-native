"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

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
    bg: (0, _tools.mode)('coolGray.200', 'gray.600')(props),
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