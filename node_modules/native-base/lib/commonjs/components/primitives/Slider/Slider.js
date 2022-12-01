"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _slider = require("@react-stately/slider");

var _hooks = require("../../../hooks");

var _Box = _interopRequireDefault(require("../Box"));

var _Context = require("./Context");

var _slider2 = require("@react-native-aria/slider");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Slider({
  isDisabled,
  isReadOnly,
  ...props
}, ref) {
  var _props$accessibilityL;

  const newProps = { ...props,
    'aria-label': (_props$accessibilityL = props.accessibilityLabel) !== null && _props$accessibilityL !== void 0 ? _props$accessibilityL : 'Slider'
  };

  if (typeof props.value === 'number') {
    //@ts-ignore - React Native Aria slider accepts array of values
    newProps.value = [props.value];
  }

  if (typeof props.defaultValue === 'number') {
    //@ts-ignore - React Native Aria slider accepts array of values
    newProps.defaultValue = [props.defaultValue];
  }

  props = newProps;
  const {
    onLayout,
    layout: trackLayout
  } = (0, _hooks.useLayout)();
  const updatedProps = Object.assign({}, props);

  if (isReadOnly || isDisabled) {
    updatedProps.isDisabled = true;
  }

  const state = (0, _slider.useSliderState)({ ...updatedProps,
    //@ts-ignore
    numberFormatter: {
      format: e => e
    },
    minValue: props.minValue,
    maxValue: props.maxValue,
    onChange: val => {
      props.onChange && props.onChange(val[0]);
    },
    onChangeEnd: val => {
      props.onChangeEnd && props.onChangeEnd(val[0]);
    }
  });
  const resolvedProps = (0, _hooks.usePropsResolution)('Slider', props, {
    isDisabled,
    isReadOnly
  });
  const {
    trackProps
  } = (0, _slider2.useSlider)(props, state, trackLayout);

  const contextValue = _react.default.useMemo(() => {
    return {
      trackLayout,
      state,
      orientation: props.orientation,
      isDisabled: isDisabled,
      isReversed: props.isReversed,
      colorScheme: props.colorScheme,
      trackProps,
      isReadOnly: isReadOnly,
      onTrackLayout: onLayout,
      thumbSize: resolvedProps.thumbSize,
      sliderSize: resolvedProps.sliderTrackHeight,
      _interactionBox: resolvedProps._interactionBox
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackLayout, state, props.orientation, isDisabled, props.isReversed, props.colorScheme, isReadOnly, onLayout, resolvedProps.thumbSize, resolvedProps.sliderTrackHeight]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Context.SliderContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
    ref: ref
  }), _react.default.Children.map(props.children, (child, index) => {
    if (child.displayName === 'SliderThumb') {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        index
      });
    }

    return child;
  })));
}

var _default = /*#__PURE__*/(0, _react.forwardRef)(Slider);

exports.default = _default;
//# sourceMappingURL=Slider.js.map