function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useThemeProps } from '../../../hooks';
import { HStack } from '../../primitives';
import { APPROX_STATUSBAR_HEIGHT } from './utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AppBar = ({
  children,
  ...props
}, ref) => {
  const {
    statusBarHeight = APPROX_STATUSBAR_HEIGHT,
    ...newProps
  } = useThemeProps('AppBar', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(HStack, _extends({
    mt: statusBarHeight,
    justifyContent: "space-between",
    alignItems: "center"
  }, newProps, {
    ref: ref
  }), children);
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(AppBar));
//# sourceMappingURL=AppBar.js.map