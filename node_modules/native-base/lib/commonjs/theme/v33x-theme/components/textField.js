"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = void 0;

var _tools = require("../tools");

// TextField
const baseStyle = props => {
  return {
    _errorMessageProps: {
      mt: 1,
      ml: 3,
      fontSize: 'xs',
      color: 'error.400'
    },
    _helperTextProps: {
      mt: 1,
      ml: 3,
      fontSize: 'xs',
      color: (0, _tools.mode)('muted.400', 'muted.500')(props)
    }
  };
};

const TextField = {
  baseStyle,
  defaultProps: {
    component: 'input'
  }
};
exports.TextField = TextField;
//# sourceMappingURL=textField.js.map