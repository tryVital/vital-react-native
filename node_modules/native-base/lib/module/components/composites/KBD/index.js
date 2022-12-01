function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box } from '../../primitives';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Kbd = ({
  children,
  ...props
}, ref) => {
  const newProps = useThemeProps('Kbd', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, newProps, {
    ref: ref
  }), children);
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Kbd));
//# sourceMappingURL=index.js.map