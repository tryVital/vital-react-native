function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Box from '../../primitives/Box';
import { useThemeProps } from '../../../hooks';
import { TabsContext } from './Context';
import { Item } from '@react-stately/collections';
import { useTabsState } from '@react-stately/tabs';
import TabViews from './TabViews';
import TabBar from './TabBar';
import { useTabs } from '@react-native-aria/tabs';
import { mergeRefs } from '../../../utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const getTabsAndBars = children => {
  let bars = [];
  let views = [];
  let items = React.Children.toArray(children);
  let tabBarProps = {
    props: {},
    ref: undefined
  };
  let tabViewsProps = {
    props: {},
    ref: undefined
  };
  items.forEach(item => {
    if (item.type) {
      if (item.type.displayName === 'TabBar') {
        bars = bars.concat(item.props.children);
        tabBarProps = {
          props: item.props,
          ref: item.ref
        };
      } else if (item.type.displayName === 'TabViews') {
        views = views.concat(item.props.children);
        tabViewsProps = {
          props: item.props,
          ref: item.ref
        };
      }
    }
  });
  return {
    views,
    bars,
    tabViewsProps,
    tabBarProps
  };
};

const convertToCollectionItems = children => {
  const {
    views,
    bars
  } = getTabsAndBars(children);
  return bars.map((bar, index) => {
    let textValue;

    if (bar.props.accessibilityLabel) {
      textValue = bar.props.accessibilityLabel;
    } else if (typeof bar.props.children === 'string') {
      textValue = bar.props.children;
    }

    return /*#__PURE__*/React.createElement(Item, {
      key: index,
      title: bar,
      textValue: textValue
    }, views[index]);
  });
};

const Tabs = ({
  children,
  ...props
}, ref) => {
  const {
    onChange,
    activeTabStyle,
    inactiveTabStyle,
    activeIconProps,
    inactiveIconProps,
    tabBarStyle,
    isFitted,
    align,
    ...newProps
  } = useThemeProps('Tabs', props); // useTabsState needs collection children.

  const collectionChildren = convertToCollectionItems(children);
  const {
    tabBarProps,
    tabViewsProps
  } = getTabsAndBars(children);
  const mappedProps = {
    children: collectionChildren,
    defaultSelectedKey: props.defaultIndex !== undefined ? props.defaultIndex.toString() : undefined,
    selectedKey: props.index !== undefined ? props.index.toString() : undefined,
    onSelectionChange: e => onChange && onChange(parseInt(e)),
    keyboardActivation: props.keyboardActivation
  }; // useTabsState needs collection children.

  let state = useTabsState(mappedProps);

  const setAlign = () => {
    switch (align) {
      case 'start':
        return 'flex-start';

      case 'end':
        return 'flex-end';

      case 'center':
        return 'center';

      default:
        return 'flex-start';
    }
  };

  let tablistRef = React.useRef();
  let {
    tabListProps,
    tabPanelProps
  } = useTabs(mappedProps, state, tablistRef); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(TabsContext.Provider, {
    value: {
      activeTabStyle,
      inactiveTabStyle,
      activeIconProps,
      inactiveIconProps,
      tabBarStyle,
      isFitted,
      align: setAlign(),
      state
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({
    width: "100%"
  }, newProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(TabBar, _extends({
    tabListProps: tabListProps
  }, tabBarProps.props, {
    tablistRef: mergeRefs([tablistRef, tabBarProps.ref])
  })), /*#__PURE__*/React.createElement(TabViews, _extends({}, tabPanelProps, tabViewsProps.props, {
    ref: tabViewsProps.ref
  }), state.selectedItem && state.selectedItem.props.children)));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Tabs));
//# sourceMappingURL=Tabs.js.map