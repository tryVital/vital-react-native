function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { default as Box } from '../Box';
import { getAbsoluteChildren } from '../../../utils';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ZStack = ({
  children,
  reversed,
  ...props
}, ref) => {
  const resolvedProps = usePropsResolution('ZStack', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), getAbsoluteChildren(children, reversed));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ZStack));
//# sourceMappingURL=index.js.map