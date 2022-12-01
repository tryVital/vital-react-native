"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _InputBase = _interopRequireDefault(require("./InputBase"));

var _Box = _interopRequireDefault(require("../Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _utils = require("../../../theme/tools/utils");

var _interactions = require("@react-native-aria/interactions");

var _utils2 = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const InputAdvance = ({
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  onFocus,
  onBlur,
  inputProps,
  wrapperRef,
  ...props
}, ref) => {
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };

  if (InputLeftElement) {
    leftElement = InputLeftElement;
  }

  if (InputRightElement) {
    rightElement = InputRightElement;
  }

  const [isFocused, setIsFocused] = _react.default.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);
  const resolvedProps = (0, _useThemeProps.usePropsResolution)('Input', { ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered,
    isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const [layoutProps, nonLayoutProps] = (0, _utils.extractInObject)(resolvedProps, [..._utils.stylingProps.margin, ..._utils.stylingProps.border, ..._utils.stylingProps.layout, ..._utils.stylingProps.flexbox, ..._utils.stylingProps.position, ..._utils.stylingProps.background, 'shadow', 'opacity']); // Extracting baseInputProps from remaining props

  const [, baseInputProps] = (0, _utils.extractInObject)(nonLayoutProps, ['variant']); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)({ ...props,
    InputLeftElement,
    InputRightElement,
    onFocus,
    onBlur,
    inputProps,
    wrapperRef
  })) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }, layoutProps, {
    ref: (0, _utils2.mergeRefs)([_ref, wrapperRef])
  }), InputLeftElement || leftElement ? InputLeftElement || leftElement : null, /*#__PURE__*/_react.default.createElement(_InputBase.default, _extends({
    inputProps: inputProps,
    bg: "transparent"
  }, baseInputProps, {
    flex: 1,
    disableFocusHandling: true,
    ref: ref,
    variant: "unstyled",
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    },
    shadow: "none"
  })), InputRightElement || rightElement ? InputRightElement || rightElement : null);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(InputAdvance));

exports.default = _default;
//# sourceMappingURL=InputAdvanced.js.map