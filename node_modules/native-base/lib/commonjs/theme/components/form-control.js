"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormControlHelperText = exports.FormControlLabel = exports.FormControlErrorMessage = exports.FormControl = void 0;
// FormControl
const FormControl = {
  baseStyle: {
    width: '100%'
  }
}; // FormControlErrorMessage

exports.FormControl = FormControl;
const FormControlErrorMessage = {
  baseStyle: () => {
    return {
      mt: '2',
      _text: {
        fontSize: 'xs',
        color: 'error.600'
      },
      _stack: {
        space: 1,
        alignItems: 'center'
      },
      _dark: {
        _text: {
          color: 'error.500'
        }
      }
    };
  }
}; // FormControlLabel

exports.FormControlErrorMessage = FormControlErrorMessage;
const FormControlLabel = {
  baseStyle: () => {
    return {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      _text: {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'text.500'
      },
      my: '1',
      _astrick: {
        color: 'error.600'
      },
      _dark: {
        _text: {
          color: 'text.400'
        },
        _astrick: {
          color: 'error.500'
        }
      }
    };
  }
}; // FormControlHelperText

exports.FormControlLabel = FormControlLabel;
const FormControlHelperText = {
  baseStyle: () => {
    return {
      mt: '2',
      _text: {
        fontSize: 'xs',
        color: 'text.500'
      },
      _dark: {
        _text: {
          color: 'text.400'
        }
      }
    };
  }
};
exports.FormControlHelperText = FormControlHelperText;
//# sourceMappingURL=form-control.js.map