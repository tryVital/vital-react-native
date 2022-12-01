"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormControlHelperText = exports.FormControlLabel = exports.FormControlErrorMessage = exports.FormControl = void 0;

var _tools = require("../tools");

// FormControl
const FormControl = {
  baseStyle: {
    width: '100%'
  }
}; // FormControlErrorMessage

exports.FormControl = FormControl;
const FormControlErrorMessage = {
  baseStyle: props => {
    return {
      mt: '2',
      _text: {
        fontSize: 'xs',
        color: (0, _tools.mode)('danger.600', 'danger.300')(props)
      },
      _stack: {
        space: 1,
        alignItems: 'center'
      }
    };
  }
}; // FormControlLabel

exports.FormControlErrorMessage = FormControlErrorMessage;
const FormControlLabel = {
  baseStyle: props => {
    return {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      _text: {
        fontSize: 'sm',
        fontWeight: 'medium'
      },
      _astrick: {
        color: (0, _tools.mode)('danger.600', 'danger.300')(props)
      },
      mb: '2',
      mr: '3'
    };
  }
}; // FormControlHelperText

exports.FormControlLabel = FormControlLabel;
const FormControlHelperText = {
  baseStyle: props => {
    return {
      mt: '2',
      _text: {
        fontSize: 'xs',
        color: (0, _tools.mode)('muted.500', 'muted.400')(props)
      }
    };
  }
};
exports.FormControlHelperText = FormControlHelperText;
//# sourceMappingURL=form-control.js.map