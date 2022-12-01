function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { useSliderState } from '@react-stately/slider';
import { useLayout } from '../../../hooks';
import { usePropsResolution } from '../../../hooks';
import Box from '../Box';
import { SliderContext } from './Context';
import { useSlider } from '@react-native-aria/slider';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

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
  } = useLayout();
  const updatedProps = Object.assign({}, props);

  if (isReadOnly || isDisabled) {
    updatedProps.isDisabled = true;
  }

  const state = useSliderState({ ...updatedProps,
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
  const resolvedProps = usePropsResolution('Slider', props, {
    isDisabled,
    isReadOnly
  });
  const {
    trackProps
  } = useSlider(props, state, trackLayout);
  const contextValue = React.useMemo(() => {
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

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(SliderContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), React.Children.map(props.children, (child, index) => {
    if (child.displayName === 'SliderThumb') {
      return /*#__PURE__*/React.cloneElement(child, {
        index
      });
    }

    return child;
  })));
}

export default /*#__PURE__*/forwardRef(Slider);
//# sourceMappingURL=Slider.js.map