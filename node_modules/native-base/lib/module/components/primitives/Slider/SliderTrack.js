function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { Pressable } from '../Pressable';
import Box from '../Box';
import { SliderContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const SliderTrack = ({
  children,
  ...props
}, ref) => {
  const {
    orientation,
    trackProps,
    onTrackLayout,
    colorScheme,
    sliderSize,
    isReadOnly,
    isDisabled
  } = React.useContext(SliderContext);
  const isVertical = orientation === 'vertical';
  const {
    _pressable,
    ...resolvedProps
  } = usePropsResolution('SliderTrack', {
    size: sliderSize,
    colorScheme,
    isVertical,
    ...props
  }, {
    isReadOnly,
    isDisabled
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    onLayout: onTrackLayout,
    ref: ref
  }, trackProps, _pressable), /*#__PURE__*/React.createElement(Box, resolvedProps, children));
};

export default /*#__PURE__*/React.forwardRef(SliderTrack);
//# sourceMappingURL=SliderTrack.js.map