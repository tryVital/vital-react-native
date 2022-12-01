"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actionsheet = void 0;

var _Actionsheet = _interopRequireDefault(require("./Actionsheet"));

var _ActionsheetItem = _interopRequireDefault(require("./ActionsheetItem"));

var _ActionsheetContent = _interopRequireDefault(require("./ActionsheetContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ActionsheetHeader from './ActionsheetHeader';
// import ActionsheetFooter from './ActionsheetFooter';
const ActionsheetTemp = _Actionsheet.default;
ActionsheetTemp.Content = _ActionsheetContent.default;
ActionsheetTemp.Item = _ActionsheetItem.default; // ActionsheetTemp.Header = ActionsheetHeader;
// ActionsheetTemp.Footer = ActionsheetFooter;
// To add typings

const Actionsheet = ActionsheetTemp;
exports.Actionsheet = Actionsheet;
//# sourceMappingURL=index.js.map