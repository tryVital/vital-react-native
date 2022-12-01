"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _Modal = _interopRequireDefault(require("./Modal"));

var _ModalContent = _interopRequireDefault(require("./ModalContent"));

var _ModalBody = _interopRequireDefault(require("./ModalBody"));

var _ModalCloseButton = _interopRequireDefault(require("./ModalCloseButton"));

var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ModalTemp = _Modal.default;
ModalTemp.Content = _ModalContent.default;
ModalTemp.CloseButton = _ModalCloseButton.default;
ModalTemp.Header = _ModalHeader.default;
ModalTemp.Footer = _ModalFooter.default;
ModalTemp.Body = _ModalBody.default;
const ModalMain = ModalTemp;
exports.Modal = ModalMain;
//# sourceMappingURL=index.js.map