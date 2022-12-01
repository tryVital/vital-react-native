"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../../hooks");

var _Popper = require("../Popper");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PopoverArrow = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const resolvedProps = (0, _hooks.usePropsResolution)('PopoverArrow', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Popper.Popper.Arrow, _extends({}, resolvedProps, {
    ref: ref
  }));
});

PopoverArrow.displayName = 'PopperArrow';
var _default = PopoverArrow;
exports.default = _default;
//# sourceMappingURL=PopoverArrow.js.map