"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputRightAddon = exports.InputLeftAddon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _usePropsResolution = require("../../../hooks/useThemeProps/usePropsResolution");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const InputLeftAddon = /*#__PURE__*/(0, _react.memo)(
/*#__PURE__*/
//@r
(0, _react.forwardRef)((props, ref) => {
  const resolvedProps = (0, _usePropsResolution.usePropsResolution)('InputLeftAddon', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
    ref: ref
  }), props.children);
}));
exports.InputLeftAddon = InputLeftAddon;
const InputRightAddon = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const resolvedProps = (0, _usePropsResolution.usePropsResolution)('InputRightAddon', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
    ref: ref
  }), props.children);
}));
exports.InputRightAddon = InputRightAddon;
//# sourceMappingURL=InputAddons.js.map