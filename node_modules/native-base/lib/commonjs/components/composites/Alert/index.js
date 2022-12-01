"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;

var _AlertIcon = _interopRequireDefault(require("./AlertIcon"));

var _Alert = _interopRequireDefault(require("./Alert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AlertTemp = _Alert.default;
AlertTemp.Icon = _AlertIcon.default; // To add typings

const Alert = AlertTemp;
exports.Alert = Alert;
//# sourceMappingURL=index.js.map