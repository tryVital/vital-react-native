function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Box from '../../primitives/Box';
import { TabsContext } from './Context';
import { mergeRefs } from '../../../utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const TabBarImpl = ({
  tablistRef,
  tabListProps,
  ...props
}, ref) => {
  const {
    tabBarStyle,
    align,
    isFitted,
    state
  } = React.useContext(TabsContext); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    flexDirection: "row",
    width: "100%",
    justifyContent: isFitted ? 'space-between' : align
  }, tabListProps, tabBarStyle, props, {
    ref: mergeRefs([ref, tablistRef])
  }), [...state.collection].map(item => /*#__PURE__*/React.cloneElement(item.rendered, {
    item,
    key: item.key
  })));
};

const TabBar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TabBarImpl));
TabBar.displayName = 'TabBar';
export default TabBar;
//# sourceMappingURL=TabBar.js.map