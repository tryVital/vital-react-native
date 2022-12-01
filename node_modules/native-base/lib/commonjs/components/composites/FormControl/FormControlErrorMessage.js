"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Stack = require("../../primitives/Stack");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useFormControl = require("./useFormControl");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils = require("../../../utils");

var _Text = _interopRequireDefault(require("../../primitives/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FormControlErrorMessage = (props, ref) => {
  const formControlContext = (0, _useFormControl.useFormControlContext)();
  const combinedProps = (0, _utils.combineContextAndProps)(formControlContext, props);
  const {
    leftIcon,
    rightIcon,
    children,
    _text,
    _stack,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('FormControlErrorMessage', combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid // isRequired: combinedProps.isRequired,

  });
  let {
    startIcon,
    endIcon
  } = resolvedProps;

  if (rightIcon) {
    endIcon = rightIcon;
  }

  if (leftIcon) {
    startIcon = leftIcon;
  }

  if (endIcon && /*#__PURE__*/_react.default.isValidElement(endIcon)) {
    endIcon = _react.default.Children.map(endIcon, (child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "button-end-icon-".concat(index),
        ..._text,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/_react.default.isValidElement(startIcon)) {
    startIcon = _react.default.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "button-start-icon-".concat(index),
        ..._text,
        ...child.props
      });
    });
  }

  _react.default.useEffect(() => {
    resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasFeedbackText(true);
    return () => {
      resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasFeedbackText(false);
    };
  }); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return resolvedProps !== null && resolvedProps !== void 0 && resolvedProps.isInvalid && children ? /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    nativeID: resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.helpTextId
  }, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Stack.HStack, _stack, startIcon, /*#__PURE__*/_react.default.createElement(_Text.default, _text, children), endIcon)) : null;
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(FormControlErrorMessage));

exports.default = _default;
//# sourceMappingURL=FormControlErrorMessage.js.map