"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Icons = require("../../primitives/Icon/Icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SizedIcon = ({
  icon,
  _icon,
  isChecked
}) => {
  return isChecked ? icon ? /*#__PURE__*/_react.default.cloneElement(icon, { ..._icon
  }) : /*#__PURE__*/_react.default.createElement(_Icons.CheckIcon, _icon) : /*#__PURE__*/_react.default.createElement(_Box.default, _icon);
};

var _default = SizedIcon;
exports.default = _default;
//# sourceMappingURL=SizedIcon.js.map