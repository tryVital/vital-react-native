function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Icon } from '../../primitives/Icon';
import { TabsContext } from './Context';
import { TabContext } from './Tab';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const TabIcon = (props, ref) => {
  const {
    activeIconProps,
    inactiveIconProps
  } = React.useContext(TabsContext);
  const {
    isSelected
  } = React.useContext(TabContext);
  const iconProps = isSelected ? activeIconProps : inactiveIconProps; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Icon, _extends({}, iconProps, props, {
    ref: ref
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TabIcon));
//# sourceMappingURL=TabIcon.js.map