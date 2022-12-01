function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { Platform } from 'react-native';
import { useSliderThumb } from '@react-native-aria/slider';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToken } from '../../../hooks';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import Box from '../Box';
import { SliderContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useHover } from '@react-native-aria/interactions';
import { mergeRefs } from '../../../utils';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { Stack } from '../Stack';
import { Center } from '../../composites/Center';

function SliderThumb(props, ref) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const {
    state,
    trackLayout,
    orientation,
    colorScheme,
    thumbSize,
    isReadOnly,
    isDisabled,
    _interactionBox: interactionBoxContext
  } = React.useContext(SliderContext);
  const {
    onFocus,
    onBlur,
    _stack,
    _interactionBox,
    ...resolvedProps
  } = usePropsResolution('SliderThumb', {
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
  const inputRef = React.useRef(null);
  const {
    thumbProps,
    inputProps
  } = useSliderThumb({
    index: 0,
    trackLayout,
    inputRef,
    orientation
  }, state);
  React.useEffect(() => {
    setIsPressed(state.isThumbDragging(0));
  }, [state]);
  const thumbAbsoluteSize = useToken('sizes', resolvedProps.size);
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
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, ...stylingProps.outline]);
  const [accessibilityProps, nonAccessibilityProps] = extractInObject(nonLayoutProps, ['accessibilityRole', 'accessibilityState']); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
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
    ref: mergeRefs([_ref, ref])
  }), /*#__PURE__*/React.createElement(Stack, _stack, /*#__PURE__*/React.createElement(Box, _interactionBox), /*#__PURE__*/React.createElement(Center, nonAccessibilityProps, props.children, Platform.OS === 'web' && /*#__PURE__*/React.createElement(VisuallyHidden, null, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef
  }, inputProps))))));
}

SliderThumb.displayName = 'SliderThumb';
export default /*#__PURE__*/forwardRef(SliderThumb);
//# sourceMappingURL=SliderThumb.js.map