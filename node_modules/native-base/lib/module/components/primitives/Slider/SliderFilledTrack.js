function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { SliderContext } from './Context';
import Box from '../Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const SliderFilledTrack = (props, ref) => {
  const {
    isReversed,
    colorScheme,
    state,
    trackLayout,
    orientation,
    isDisabled,
    sliderSize,
    isReadOnly
  } = React.useContext(SliderContext);
  const sliderTrackPosition = isReversed ? orientation === 'vertical' ? trackLayout.height - trackLayout.height * state.getThumbPercent(0) : trackLayout.width - trackLayout.width * state.getThumbPercent(0) : state.getThumbPercent(0) * 100 + '%';
  const resolvedProps = usePropsResolution('SliderFilledTrack', {
    size: sliderSize,
    colorScheme,
    isReversed,
    orientation,
    sliderTrackPosition,
    ...props
  }, {
    isDisabled,
    isReadOnly
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    position: "absolute"
  }, resolvedProps, {
    ref: ref // {...(isReadOnly && _readOnly)}
    // {...(isDisabled && _disabled)}

  }));
};

export default /*#__PURE__*/React.forwardRef(SliderFilledTrack);
//# sourceMappingURL=SliderFilledTrack.js.map