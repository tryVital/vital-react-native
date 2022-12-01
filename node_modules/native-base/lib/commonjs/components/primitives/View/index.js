"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styled = require("../../../utils/styled");

var _reactNative = require("react-native");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useSafeArea = require("../../../hooks/useSafeArea");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledView = (0, _styled.makeStyledComponent)(_reactNative.View);

const View = (props, ref) => {
  const viewProps = (0, _useThemeProps.useThemeProps)('View', props);
  const safeAreaProps = (0, _useSafeArea.useSafeArea)(viewProps); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(StyledView, _extends({}, safeAreaProps, {
    ref: ref
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(View));

exports.default = _default;
//# sourceMappingURL=index.js.map