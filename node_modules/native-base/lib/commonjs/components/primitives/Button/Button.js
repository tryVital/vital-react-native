"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Box = _interopRequireDefault(require("../Box"));

var _HStack = _interopRequireDefault(require("../Stack/HStack"));

var _Pressable = require("../Pressable");

var _utils = require("../../../utils");

var _Pressable2 = require("../../primitives/Pressable/Pressable");

var _focus = require("@react-native-aria/focus");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Button = ({
  //@ts-ignore
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  spinner,
  isDisabled,
  isLoading,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  spinnerPlacement = 'start',
  ...props
}, ref) => {
  var _props$accessibilityR;

  const {
    hoverProps,
    isHovered
  } = (0, _Pressable2.useHover)();
  const {
    pressableProps,
    isPressed
  } = (0, _Pressable2.useIsPressed)();
  const {
    focusProps,
    isFocused
  } = (0, _Pressable2.useFocus)();
  const {
    isFocusVisible,
    focusProps: focusRingProps
  } = (0, _focus.useFocusRing)();
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    _text,
    _stack,
    _spinner,
    isLoadingText,
    _icon,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Button', props, {
    isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isPressed: isPressedProp || isPressed,
    isLoading,
    isFocusVisible: isFocusVisibleProp || isFocusVisible
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
    disabled: isDisabled || isLoading,
    ref: ref,
    onPressIn: (0, _utils.composeEventHandlers)(onPressIn, pressableProps.onPressIn),
    onPressOut: (0, _utils.composeEventHandlers)(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: (0, _utils.composeEventHandlers)(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: (0, _utils.composeEventHandlers)(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onFocus, focusProps.onFocus), focusRingProps.onFocus) // @ts-ignore - web only
    ,
    onBlur: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onBlur, focusProps.onBlur), focusRingProps.onBlur)
  }, resolvedProps, {
    accessibilityRole: (_props$accessibilityR = props.accessibilityRole) !== null && _props$accessibilityR !== void 0 ? _props$accessibilityR : 'button'
  }), /*#__PURE__*/_react.default.createElement(_HStack.default, _extends({}, _stack, {
    test: true
  }), startIcon && !isLoading ? startIcon : null, isLoading && spinnerPlacement === 'start' ? spinnerElement : null, isLoading ? isLoadingText ? boxChildren(isLoadingText) : null : boxChildren(children), endIcon && !isLoading ? endIcon : null, isLoading && spinnerPlacement === 'end' ? spinnerElement : null));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Button));

exports.default = _default;
//# sourceMappingURL=Button.js.map