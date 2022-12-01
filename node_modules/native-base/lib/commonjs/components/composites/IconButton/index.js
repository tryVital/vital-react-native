"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Pressable = require("../../primitives/Pressable");

var _Icon = require("../../primitives/Icon");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils = require("../../../utils");

var _Pressable2 = require("../../primitives/Pressable/Pressable");

var _focus = require("@react-native-aria/focus");

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const IconButton = ({
  icon,
  _icon: pseudoIconProp,
  children,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  isDisabled,
  ...props
}, ref) => {
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
    _icon,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('IconButton', { ...props,
    _icon: (0, _lodash.default)({}, pseudoIconProp, icon === null || icon === void 0 ? void 0 : icon.props)
  }, {
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled
  });
  let clonedIcon;

  if (icon) {
    clonedIcon = /*#__PURE__*/_react.default.cloneElement(icon, { ..._icon
    });
  } //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    disabled: isDisabled,
    accessibilityRole: "button",
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
  }, resolvedProps), clonedIcon || /*#__PURE__*/_react.default.createElement(_Icon.Icon, _icon, children));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(IconButton));

exports.default = _default;
//# sourceMappingURL=index.js.map