function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { HStack } from '../../primitives';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AppBarLeft = props => {
  const {
    color
  } = useThemeProps('AppBar', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(HStack, _extends({
    alignItems: "center",
    _text: {
      color
    }
  }, props));
};

export default /*#__PURE__*/React.memo(AppBarLeft);
//# sourceMappingURL=AppBarLeft.js.map