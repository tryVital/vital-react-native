"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverContext = /*#__PURE__*/_react.default.createContext({
  onClose: () => {},
  initialFocusRef: {
    current: null
  },
  finalFocusRef: {
    current: null
  },
  popoverContentId: undefined,
  headerId: undefined,
  bodyId: undefined,
  setHeaderMounted: () => {},
  setBodyMounted: () => {},
  headerMounted: false,
  bodyMounted: false,
  isOpen: false
});

exports.PopoverContext = PopoverContext;
//# sourceMappingURL=PopoverContext.js.map