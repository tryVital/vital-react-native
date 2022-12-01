function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Text from '../../primitives/Text';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import Box from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const MenuGroup = ({
  title,
  children,
  ...props
}, ref) => {
  const {
    _title,
    ...resolvedProps
  } = usePropsResolution('MenuGroup', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps({ ...props,
    title
  })) {
    return null;
  } //TODO: Can be simplified


  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(Text, _title, title)), children);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(MenuGroup));
//# sourceMappingURL=MenuGroup.js.map