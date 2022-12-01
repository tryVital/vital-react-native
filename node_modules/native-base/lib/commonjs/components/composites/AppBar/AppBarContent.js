"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _primitives = require("../../primitives");

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AppBarContent = props => {
  const {
    color
  } = (0, _hooks.useThemeProps)('AppBar', props);
  return /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({
    alignItems: "center",
    flexDirection: "row",
    _text: {
      color
    }
  }, props));
};

var _default = /*#__PURE__*/_react.default.memo(AppBarContent);

exports.default = _default;
//# sourceMappingURL=AppBarContent.js.map