"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _CheckboxGroup = _interopRequireDefault(require("./CheckboxGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CheckTemp = _Checkbox.default;
CheckTemp.Group = _CheckboxGroup.default; // To add typings

const Checkbox = CheckTemp;
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map