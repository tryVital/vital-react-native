function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Flex = (props, ref) => {
  const {
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    direction,
    ...resolvedProps
  } = usePropsResolution('Flex', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    flexDirection: direction || resolvedProps.flexDirection,
    alignItems: align || resolvedProps.alignItems,
    justifyContent: justify || resolvedProps.justifyContent,
    flexGrow: grow || resolvedProps.flexGrow,
    flexBasis: basis || resolvedProps.flexBasis,
    flexShrink: shrink || resolvedProps.flexShrink,
    flexWrap: wrap || resolvedProps.flexWrap,
    ref: ref
  }));
}; //Spacer Component that adds space between components where it is placed


export const Spacer = props => {
  const resolvedProps = usePropsResolution('Spacer', props);
  return /*#__PURE__*/React.createElement(Box, resolvedProps);
};
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Flex));
//# sourceMappingURL=index.js.map