function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import Box from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Center = (props, ref) => {
  const resolvedProps = usePropsResolution('Center', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref
  }, resolvedProps));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Center));
//# sourceMappingURL=Center.js.map