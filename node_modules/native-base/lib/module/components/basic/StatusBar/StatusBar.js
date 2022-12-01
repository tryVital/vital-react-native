function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { StatusBar as RNStatusBar } from 'react-native'; // import type { IStatusBarProps } from './types';

import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const StatusBar = /*#__PURE__*/forwardRef((props, ref) => {
  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(RNStatusBar, _extends({}, props, {
    ref: ref
  }));
});
//# sourceMappingURL=StatusBar.js.map