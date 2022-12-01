"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinInput = void 0;

var _PinInputField = _interopRequireDefault(require("./PinInputField"));

var _PinInput = _interopRequireDefault(require("./PinInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PinInputTemp = _PinInput.default;
PinInputTemp.Field = _PinInputField.default; // To add typings

const PinInput = PinInputTemp;
exports.PinInput = PinInput;
//# sourceMappingURL=index.js.map