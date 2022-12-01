"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ButtonTemp = _Button.default;
ButtonTemp.Group = _ButtonGroup.default; // To add typings

const Button = ButtonTemp;
exports.Button = Button;
//# sourceMappingURL=index.js.map