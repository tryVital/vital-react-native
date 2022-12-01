"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useIsPressed = exports.useFocus = exports.useHover = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _styled = require("../../../utils/styled");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _focus = require("@react-native-aria/focus");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useHover = () => {
  const [isHovered, setHovered] = _react.default.useState(false);

  return {
    hoverProps: {
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false)
    },
    isHovered
  };
};

exports.useHover = useHover;

const useFocus = () => {
  const [isFocused, setFocused] = _react.default.useState(false);

  return {
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false)
    },
    isFocused
  };
};

exports.useFocus = useFocus;

const useIsPressed = () => {
  const [isPressed, setIsPressed] = _react.default.useState(false);

  return {
    pressableProps: {
      onPressIn: () => setIsPressed(true),
      onPressOut: () => setIsPressed(false)
    },
    isPressed
  };
};

exports.useIsPressed = useIsPressed;
const StyledPressable = (0, _styled.makeStyledComponent)(_reactNative.Pressable);

const Pressable = ({
  children,
  isDisabled,
  disabled,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  const {
    hoverProps,
    isHovered
  } = useHover();
  const {
    pressableProps,
    isPressed
  } = useIsPressed();
  const {
    focusProps,
    isFocused
  } = useFocus();
  const {
    isFocusVisible,
    focusProps: focusRingProps
  } = (0, _focus.useFocusRing)();
  const stateProps = {
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused,
    isHovered: isHoveredProp || isHovered
  };
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Pressable', props, { ...stateProps,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled: disabled || isDisabled
  }); // TODO: Replace Render props with Context Hook
  //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  } // TODO: Replace Render props with Context Hook


  return /*#__PURE__*/_react.default.createElement(StyledPressable, _extends({
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
    onBlur: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onBlur, focusProps.onBlur), focusRingProps.onBlur),
    disabled: disabled || isDisabled
  }, resolvedProps), typeof children !== 'function' ? children : children({ ...stateProps
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Pressable));

exports.default = _default;
//# sourceMappingURL=Pressable.js.map