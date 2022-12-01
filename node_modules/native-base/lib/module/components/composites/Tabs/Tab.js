function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createContext } from 'react';
import { Pressable } from '../../primitives/Pressable';
import Box from '../../primitives/Box';
import { TabsContext } from './Context';
import { omitUndefined } from '../../../theme/tools/utils';
import { useTab } from '@react-native-aria/tabs';
import { useHover } from '@react-native-aria/interactions';
import { mergeRefs } from '../../../utils';
import merge from 'lodash.merge';
import { themeTools } from '../../../theme';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const TabContext = /*#__PURE__*/createContext({});

const Tab = ({
  children,
  isDisabled,
  style,
  _active,
  _disabled,
  item,
  ...props
}, ref) => {
  const newProps = omitUndefined(props);
  const {
    inactiveTabStyle,
    activeTabStyle,
    state,
    isFitted
  } = React.useContext(TabsContext);
  let tabRef = React.useRef(null);

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  let isSelected = state.selectedKey === item.key;
  let {
    tabProps
  } = useTab({
    item,
    isDisabled
  }, state, tabRef);
  React.useEffect(() => {
    if (isDisabled) {
      state.disabledKeys.add(item.key);
    } else {
      state.disabledKeys.delete(item.key);
    }
  }, [isDisabled, item.key, state.disabledKeys]);
  const tabStyle = isSelected ? activeTabStyle : inactiveTabStyle;
  const {
    _hover,
    ...remainingTabStyle
  } = tabStyle;
  const mergedProps = merge(remainingTabStyle, newProps);
  const [marginalProps, remainingProps] = themeTools.extractInObject(mergedProps, ['margin', 'm', 'marginTop', 'mt', 'marginRight', 'mr', 'marginBottom', 'mb', 'marginLeft', 'ml', 'marginX', 'mx', 'marginY', 'my']); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(TabContext.Provider, {
    value: {
      isSelected
    }
  }, /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: isDisabled,
    ref: mergeRefs([tabRef, _ref, ref]),
    flex: isFitted ? 1 : undefined
  }, tabProps, marginalProps), /*#__PURE__*/React.createElement(Box, _extends({}, remainingProps, isHovered && _hover, {
    style: [style, isSelected && _active, isDisabled && _disabled]
  }), children)));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Tab));
//# sourceMappingURL=Tab.js.map