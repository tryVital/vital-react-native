function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks/useThemeProps/usePropsResolution';

const Card = ({
  children,
  ...props
}, ref) => {
  const resolvedProps = usePropsResolution('Card', props);
  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), children);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Card));
//# sourceMappingURL=Card.js.map