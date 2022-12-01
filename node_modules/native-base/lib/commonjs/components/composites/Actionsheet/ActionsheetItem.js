"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Pressable = require("../../primitives/Pressable");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Stack = require("../../primitives/Stack");

var _Spinner = _interopRequireDefault(require("../../primitives/Spinner"));

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ActionsheetItem = ({
  //@ts-ignore
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  spinner,
  isDisabled,
  isLoading,
  spinnerPlacement = 'start',
  ...props
}, ref) => {
  const {
    _text,
    _stack,
    _icon,
    _spinner,
    isLoadingText,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('ActionsheetItem', props, undefined, {
    cascadePseudoProps: true
  }); //TODO: refactor for responsive prop

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
        key: "button-end-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/_react.default.isValidElement(startIcon)) {
    startIcon = _react.default.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "button-start-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  const spinnerElement = spinner ? spinner : /*#__PURE__*/_react.default.createElement(_Spinner.default, _extends({
    color: _text === null || _text === void 0 ? void 0 : _text.color
  }, _spinner));

  const boxChildren = child => {
    return child ? /*#__PURE__*/_react.default.createElement(_Box.default, {
      _text: _text
    }, child) : null;
  };

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    disabled: isDisabled || isLoading
  }, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Stack.HStack, _extends({}, _stack, {
    test: true
  }), startIcon && !isLoading ? startIcon : null, isLoading && spinnerPlacement === 'start' ? spinnerElement : null, isLoading ? isLoadingText ? boxChildren(isLoadingText) : null : boxChildren(children), endIcon && !isLoading ? endIcon : null, isLoading && spinnerPlacement === 'end' ? spinnerElement : null));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(ActionsheetItem));

exports.default = _default;
//# sourceMappingURL=ActionsheetItem.js.map