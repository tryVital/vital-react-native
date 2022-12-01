"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _slider = require("@react-native-aria/slider");

var _visuallyHidden = require("@react-aria/visually-hidden");

var _hooks = require("../../../hooks");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Box = _interopRequireDefault(require("../Box"));

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _interactions = require("@react-native-aria/interactions");

var _utils = require("../../../utils");

var _utils2 = require("../../../theme/tools/utils");

var _Stack = require("../Stack");

var _Center = require("../../composites/Center");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SliderThumb(props, ref) {
  const [isPressed, setIsPressed] = _react.default.useState(false);

  const [isFocused, setIsFocused] = _react.default.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);

  const {
    state,
    trackLayout,
    orientation,
    colorScheme,
    thumbSize,
    isReadOnly,
    isDisabled,
    _interactionBox: interactionBoxContext
  } = _react.default.useContext(_Context.SliderContext);

  const {
    onFocus,
    onBlur,
    _stack,
    _interactionBox,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('SliderThumb', {
    size: thumbSize,
    _interactionBox: interactionBoxContext,
    colorScheme,
    ...props
  }, {
    isDisabled,
    isReadOnly,
    isPressed,
    isFocused,
    isHovered
  });

  const inputRef = _react.default.useRef(null);

  const {
    thumbProps,
    inputProps
  } = (0, _slider.useSliderThumb)({
    index: 0,
    trackLayout,
    inputRef,
    orientation
  }, state);

  _react.default.useEffect(() => {
    setIsPressed(state.isThumbDragging(0));
  }, [state]);

  const thumbAbsoluteSize = (0, _hooks.useToken)('sizes', resolvedProps.size);
  const thumbStyles = {
    bottom: orientation === 'vertical' ? "".concat(state.getThumbPercent(0) * 100, "%") : undefined,
    left: orientation !== 'vertical' ? "".concat(state.getThumbPercent(0) * 100, "%") : undefined,
    transform: orientation === 'vertical' ? [{
      translateY: parseInt(thumbAbsoluteSize) / 2
    }] : [{
      translateX: -parseInt(thumbAbsoluteSize) / 2
    }]
  };
  thumbStyles.transform.push({
    scale: state.isThumbDragging(0) ? resolvedProps.scaleOnPressed : 1
  });
  const [layoutProps, nonLayoutProps] = (0, _utils2.extractInObject)(resolvedProps, [..._utils2.stylingProps.margin, ..._utils2.stylingProps.layout, ..._utils2.stylingProps.flexbox, ..._utils2.stylingProps.position, ..._utils2.stylingProps.outline]);
  const [accessibilityProps, nonAccessibilityProps] = (0, _utils2.extractInObject)(nonLayoutProps, ['accessibilityRole', 'accessibilityState']); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    position: "absolute"
  }, thumbProps, resolvedProps, accessibilityProps, layoutProps, {
    style: [thumbStyles, resolvedProps.style],
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    } // {...(isReadOnly && _readOnly)}
    // {...(isDisabled && _disabled)}
    ,
    ref: (0, _utils.mergeRefs)([_ref, ref])
  }), /*#__PURE__*/_react.default.createElement(_Stack.Stack, _stack, /*#__PURE__*/_react.default.createElement(_Box.default, _interactionBox), /*#__PURE__*/_react.default.createElement(_Center.Center, nonAccessibilityProps, props.children, _reactNative.Platform.OS === 'web' && /*#__PURE__*/_react.default.createElement(_visuallyHidden.VisuallyHidden, null, /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: inputRef
  }, inputProps))))));
}

SliderThumb.displayName = 'SliderThumb';

var _default = /*#__PURE__*/(0, _react.forwardRef)(SliderThumb);

exports.default = _default;
//# sourceMappingURL=SliderThumb.js.map