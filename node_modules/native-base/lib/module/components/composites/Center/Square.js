import React from 'react';
import Box from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks/useThemeProps';

const Square = props => {
  const resolvedProps = usePropsResolution('Square', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, resolvedProps);
};

export default /*#__PURE__*/React.memo(Square);
//# sourceMappingURL=Square.js.map