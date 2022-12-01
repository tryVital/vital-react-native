"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AlertDialogContext = /*#__PURE__*/_react.default.createContext({
  handleClose: () => {},
  contentSize: {},
  initialFocusRef: {
    current: null
  },
  finalFocusRef: {
    current: null
  }
});

exports.AlertDialogContext = AlertDialogContext;
//# sourceMappingURL=Context.js.map