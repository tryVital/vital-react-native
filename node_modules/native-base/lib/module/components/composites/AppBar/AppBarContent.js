function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box } from '../../primitives';
import { useThemeProps } from '../../../hooks';

const AppBarContent = props => {
  const {
    color
  } = useThemeProps('AppBar', props);
  return /*#__PURE__*/React.createElement(Box, _extends({
    alignItems: "center",
    flexDirection: "row",
    _text: {
      color
    }
  }, props));
};

export default /*#__PURE__*/React.memo(AppBarContent);
//# sourceMappingURL=AppBarContent.js.map