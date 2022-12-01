"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  return {
    bg: (0, _tools.mode)("coolGray.600", "warmGray.200")(props),
    p: '2',
    rounded: 'sm',
    shadow: 1,
    _title: {
      color: (0, _tools.mode)("warmGray.200", "coolGray.600")(props),
      fontWeight: 700
    },
    _description: {
      color: (0, _tools.mode)("warmGray.200", "coolGray.600")(props),
      fontWeight: 400
    },
    _closeIcon: {
      size: 4
    }
  };
};

const Toast = {
  baseStyle,
  defaultProps: {}
};
exports.Toast = Toast;
//# sourceMappingURL=toast.js.map