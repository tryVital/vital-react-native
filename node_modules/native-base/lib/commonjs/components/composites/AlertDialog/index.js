"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialog = void 0;

var _AlertDialog = _interopRequireDefault(require("./AlertDialog"));

var _AlertDialogContent = _interopRequireDefault(require("./AlertDialogContent"));

var _AlertDialogBody = _interopRequireDefault(require("./AlertDialogBody"));

var _AlertDialogCloseButton = _interopRequireDefault(require("./AlertDialogCloseButton"));

var _AlertDialogFooter = _interopRequireDefault(require("./AlertDialogFooter"));

var _AlertDialogHeader = _interopRequireDefault(require("./AlertDialogHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AlertDialogTemp = _AlertDialog.default;
AlertDialogTemp.Content = _AlertDialogContent.default;
AlertDialogTemp.CloseButton = _AlertDialogCloseButton.default;
AlertDialogTemp.Header = _AlertDialogHeader.default;
AlertDialogTemp.Footer = _AlertDialogFooter.default;
AlertDialogTemp.Body = _AlertDialogBody.default;
const AlertDialogMain = AlertDialogTemp;
exports.AlertDialog = AlertDialogMain;
//# sourceMappingURL=index.js.map