"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _interactions = require("@react-native-aria/interactions");

var _utils = require("../../../utils");

var _styled = require("../../../utils/styled");

var _useResolvedFontFamily = require("../../../hooks/useResolvedFontFamily");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledInput = (0, _styled.makeStyledComponent)(_reactNative.TextInput);

const InputBase = ({
  onKeyPress,
  onFocus,
  onBlur,
  disableFocusHandling,
  inputProps,
  wrapperRef,
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  isHovered: isHoveredProp,
  isFocused: isFocusedProp,
  ...props
}, ref) => {
  let passUnresolvedProps;

  if (InputLeftElement || InputRightElement || leftElement || rightElement) {
    passUnresolvedProps = true;
  }

  const [isFocused, setIsFocused] = _react.default.useState(false);

  const handleFocus = (focusState, callback) => {
    !disableFocusHandling && setIsFocused(focusState);
    callback();
  };

  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);
  const {
    isFullWidth,
    isDisabled,
    isReadOnly,
    ariaLabel,
    accessibilityLabel,
    placeholderTextColor,
    selectionColor,
    underlineColorAndroid,
    type,
    fontFamily,
    fontWeight,
    fontStyle,
    _webInputBase,
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
  const resolvedFontFamily = (0, _useResolvedFontFamily.useResolvedFontFamily)({
    fontFamily,
    fontWeight: fontWeight !== null && fontWeight !== void 0 ? fontWeight : 400,
    fontStyle: fontStyle !== null && fontStyle !== void 0 ? fontStyle : 'normal'
  });
  const resolvedPlaceholderTextColor = (0, _hooks.useToken)('colors', placeholderTextColor);
  const resolvedSelectionColor = (0, _hooks.useToken)('colors', selectionColor);
  const resolvedUnderlineColorAndroid = (0, _hooks.useToken)('colors', underlineColorAndroid); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)({ ...props,
    onKeyPress,
    onFocus,
    onBlur,
    disableFocusHandling,
    inputProps
  })) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(StyledInput, _extends({}, inputProps, {
    secureTextEntry: type === 'password',
    accessible: true,
    accessibilityLabel: ariaLabel || accessibilityLabel,
    editable: isDisabled || isReadOnly ? false : true,
    w: isFullWidth ? '100%' : undefined
  }, passUnresolvedProps ? props : resolvedProps, resolvedFontFamily, {
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
    } // TODO: this can be moved to baseStyle using _web

  }, _reactNative.Platform.OS === 'web' ? {
    disabled: isDisabled,
    cursor: isDisabled ? 'not-allowed' : 'auto'
  } : {}, {
    ref: (0, _utils.mergeRefs)([ref, _ref, wrapperRef]),
    style: _reactNative.Platform.OS === 'web' ? _webInputBase : {}
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(InputBase));

exports.default = _default;
//# sourceMappingURL=InputBase.js.map