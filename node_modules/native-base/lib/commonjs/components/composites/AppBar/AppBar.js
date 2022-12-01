"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../../hooks");

var _primitives = require("../../primitives");

var _utils = require("./utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AppBar = ({
  children,
  ...props
}, ref) => {
  const {
    statusBarHeight = _utils.APPROX_STATUSBAR_HEIGHT,
    ...newProps
  } = (0, _hooks.useThemeProps)('AppBar', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_primitives.HStack, _extends({
    mt: statusBarHeight,
    justifyContent: "space-between",
    alignItems: "center"
  }, newProps, {
    ref: ref
  }), children);
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(AppBar));

exports.default = _default;
//# sourceMappingURL=AppBar.js.map