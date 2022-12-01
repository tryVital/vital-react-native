"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _HStack = _interopRequireDefault(require("../../primitives/Stack/HStack"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Badge = ({
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  ...props
}, ref) => {
  const {
    _icon,
    _text,
    ...newProps
  } = (0, _useThemeProps.usePropsResolution)('Badge', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if (leftIcon) {
    startIcon = leftIcon;
  }

  if (rightIcon) {
    endIcon = rightIcon;
  }

  if (endIcon && /*#__PURE__*/_react.default.isValidElement(endIcon)) {
    endIcon = _react.default.Children.map(endIcon, (child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "badge-end-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/_react.default.isValidElement(startIcon)) {
    startIcon = _react.default.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "badge-start-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  return /*#__PURE__*/_react.default.createElement(_HStack.default, _extends({}, newProps, {
    ref: ref
  }), startIcon ? startIcon : null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    _text: _text
  }, children), endIcon ? endIcon : null);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Badge));

exports.default = _default;
//# sourceMappingURL=index.js.map