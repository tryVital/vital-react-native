"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = props => {
  const {
    isUnderlined
  } = props;
  return {
    _text: {
      textDecorationLine: isUnderlined ? 'underline' : 'none'
    },
    width: 'auto',
    height: 'auto'
  };
};

var _default = {
  baseStyle,
  defaultProps: {
    isUnderlined: true
  }
};
exports.default = _default;
//# sourceMappingURL=link.js.map