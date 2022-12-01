"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _FormControl = require("../../composites/FormControl");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _interactions = require("@react-native-aria/interactions");

var _utils = require("../../../theme/tools/utils");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _utils2 = require("../../../utils");

var _Stack = require("../Stack");

var _styled = require("../../../utils/styled");

var _useResolvedFontFamily = require("../../../hooks/useResolvedFontFamily");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledInput = (0, _styled.makeStyledComponent)(_reactNative.TextInput);

const Input = ({
  isHovered: isHoveredProp,
  isFocused: isFocusedProp,
  onKeyPress,
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  ...props
}, ref) => {
  const inputProps = (0, _FormControl.useFormControl)({
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly,
    isRequired: props.isRequired,
    nativeID: props.nativeID
  });

  const [isFocused, setIsFocused] = _react.default.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };
  const {
    ariaLabel,
    accessibilityLabel,
    type,
    isFullWidth,
    isDisabled,
    isReadOnly,
    fontFamily,
    fontWeight,
    fontStyle,
    placeholderTextColor,
    selectionColor,
    underlineColorAndroid,
    onFocus,
    onBlur,
    wrapperRef,
    _stack,
    _input,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Input', { ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const [layoutProps, nonLayoutProps] = (0, _utils.extractInObject)(resolvedProps, [..._utils.stylingProps.margin, ..._utils.stylingProps.border, ..._utils.stylingProps.layout, ..._utils.stylingProps.flexbox, ..._utils.stylingProps.position, ..._utils.stylingProps.background, 'shadow', 'opacity']);
  const resolvedFontFamily = (0, _useResolvedFontFamily.useResolvedFontFamily)({
    fontFamily,
    fontWeight: fontWeight !== null && fontWeight !== void 0 ? fontWeight : 400,
    fontStyle: fontStyle !== null && fontStyle !== void 0 ? fontStyle : 'normal'
  });
  const resolvedPlaceholderTextColor = (0, _hooks.useToken)('colors', placeholderTextColor);
  const resolvedSelectionColor = (0, _hooks.useToken)('colors', selectionColor);
  const resolvedUnderlineColorAndroid = (0, _hooks.useToken)('colors', underlineColorAndroid);
  /**Converting into Hash Color Code */
  //@ts-ignore

  resolvedProps.focusOutlineColor = (0, _hooks.useToken)('colors', resolvedProps.focusOutlineColor); //@ts-ignore

  resolvedProps.invalidOutlineColor = (0, _hooks.useToken)('colors', resolvedProps.invalidOutlineColor); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if (resolvedProps.focusOutlineColor && isFocused) {
    layoutProps.borderColor = resolvedProps.focusOutlineColor;
    _stack.style = (0, _utils2.resolveStackStyleInput)(props.variant, resolvedProps.focusOutlineColor);
  }

  if (resolvedProps.invalidOutlineColor && props.isInvalid) {
    layoutProps.borderColor = resolvedProps.invalidOutlineColor;
    _stack.style = (0, _utils2.resolveStackStyleInput)(props.variant, resolvedProps.invalidOutlineColor);
  }

  return /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({}, _stack, layoutProps, {
    ref: (0, _utils2.mergeRefs)([_ref, wrapperRef]),
    isFocused: isFocused
  }), InputLeftElement || leftElement ? InputLeftElement || leftElement : null, /*#__PURE__*/_react.default.createElement(StyledInput, _extends({}, inputProps, {
    secureTextEntry: type === 'password',
    accessible: true,
    accessibilityLabel: ariaLabel || accessibilityLabel,
    editable: isDisabled || isReadOnly ? false : true,
    w: isFullWidth ? '100%' : undefined
  }, nonLayoutProps, resolvedFontFamily, {
    placeholderTextColor: resolvedPlaceholderTextColor,
    selectionColor: resolvedSelectionColor,
    underlineColorAndroid: resolvedUnderlineColorAndroid,
    onKeyPress: e => {
      e.persist();
      onKeyPress && onKeyPress(e);
    },
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    }
  }, _input, {
    ref: (0, _utils2.mergeRefs)([ref, _ref, wrapperRef])
  })), InputRightElement || rightElement ? InputRightElement || rightElement : null);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Input));

exports.default = _default;
//# sourceMappingURL=Input.js.map