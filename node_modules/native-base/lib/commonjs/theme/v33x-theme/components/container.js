"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = props => {
  const {
    centerContent
  } = props;
  return {
    maxWidth: '80%',
    alignItems: centerContent ? 'center' : 'flex-start',
    _text: {
      textAlign: centerContent ? 'center' : 'left'
    }
  };
};

var _default = {
  baseStyle
};
exports.default = _default;
//# sourceMappingURL=container.js.map