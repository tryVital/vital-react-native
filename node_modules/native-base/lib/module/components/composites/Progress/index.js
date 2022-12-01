function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Box } from '../../primitives';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Progress = (props, ref) => {
  const {
    min,
    max,
    value,
    _filledTrack,
    children,
    ...resolvedProps
  } = usePropsResolution('Progress', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  let valueWidth = value < max && value > min ? (value - min) / (max - min) * 100 : value > min ? 100 : 0;
  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityValue: {
      min: min,
      max: max,
      now: valueWidth
    }
  }), /*#__PURE__*/React.createElement(Box, _extends({
    w: "".concat(valueWidth, "%")
  }, _filledTrack), children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Progress));
//# sourceMappingURL=index.js.map