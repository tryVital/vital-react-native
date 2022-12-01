"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ModalContext = /*#__PURE__*/_react.default.createContext({
  handleClose: () => {},
  contentSize: {},
  initialFocusRef: {
    current: null
  },
  finalFocusRef: {
    current: null
  },
  visible: false
});

exports.ModalContext = ModalContext;
//# sourceMappingURL=Context.js.map