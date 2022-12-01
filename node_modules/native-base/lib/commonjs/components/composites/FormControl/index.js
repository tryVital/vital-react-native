"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormControlContext", {
  enumerable: true,
  get: function () {
    return _useFormControl.FormControlContext;
  }
});
Object.defineProperty(exports, "useFormControl", {
  enumerable: true,
  get: function () {
    return _useFormControl.useFormControl;
  }
});
Object.defineProperty(exports, "useFormControlProvider", {
  enumerable: true,
  get: function () {
    return _useFormControl.useFormControlProvider;
  }
});
Object.defineProperty(exports, "useFormControlContext", {
  enumerable: true,
  get: function () {
    return _useFormControl.useFormControlContext;
  }
});
exports.FormControl = void 0;

var _FormControl = _interopRequireDefault(require("./FormControl"));

var _FormControlLabel = _interopRequireDefault(require("./FormControlLabel"));

var _FormControlErrorMessage = _interopRequireDefault(require("./FormControlErrorMessage"));

var _FormControlHelperText = _interopRequireDefault(require("./FormControlHelperText"));

var _useFormControl = require("./useFormControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FormControlTemp = _FormControl.default;
FormControlTemp.Label = _FormControlLabel.default;
FormControlTemp.ErrorMessage = _FormControlErrorMessage.default;
FormControlTemp.HelperText = _FormControlHelperText.default; // To add typings

const FormControl = FormControlTemp;
exports.FormControl = FormControl;
//# sourceMappingURL=index.js.map