"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MenuContext = /*#__PURE__*/_react.default.createContext({
  closeOnSelect: true,
  onClose: () => {}
});

exports.MenuContext = MenuContext;
//# sourceMappingURL=MenuContext.js.map