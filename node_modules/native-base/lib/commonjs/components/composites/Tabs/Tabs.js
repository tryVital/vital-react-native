"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _hooks = require("../../../hooks");

var _Context = require("./Context");

var _collections = require("@react-stately/collections");

var _tabs = require("@react-stately/tabs");

var _TabViews = _interopRequireDefault(require("./TabViews"));

var _TabBar = _interopRequireDefault(require("./TabBar"));

var _tabs2 = require("@react-native-aria/tabs");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const getTabsAndBars = children => {
  let bars = [];
  let views = [];

  let items = _react.default.Children.toArray(children);

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

    return /*#__PURE__*/_react.default.createElement(_collections.Item, {
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
  } = (0, _hooks.useThemeProps)('Tabs', props); // useTabsState needs collection children.

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

  let state = (0, _tabs.useTabsState)(mappedProps);

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

  let tablistRef = _react.default.useRef();

  let {
    tabListProps,
    tabPanelProps
  } = (0, _tabs2.useTabs)(mappedProps, state, tablistRef); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Context.TabsContext.Provider, {
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
  }, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    width: "100%"
  }, newProps, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_TabBar.default, _extends({
    tabListProps: tabListProps
  }, tabBarProps.props, {
    tablistRef: (0, _utils.mergeRefs)([tablistRef, tabBarProps.ref])
  })), /*#__PURE__*/_react.default.createElement(_TabViews.default, _extends({}, tabPanelProps, tabViewsProps.props, {
    ref: tabViewsProps.ref
  }), state.selectedItem && state.selectedItem.props.children)));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Tabs));

exports.default = _default;
//# sourceMappingURL=Tabs.js.map