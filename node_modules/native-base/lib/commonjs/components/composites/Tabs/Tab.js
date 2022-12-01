"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TabContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Pressable = require("../../primitives/Pressable");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Context = require("./Context");

var _utils = require("../../../theme/tools/utils");

var _tabs = require("@react-native-aria/tabs");

var _interactions = require("@react-native-aria/interactions");

var _utils2 = require("../../../utils");

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _theme = require("../../../theme");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TabContext = /*#__PURE__*/(0, _react.createContext)({});
exports.TabContext = TabContext;

const Tab = ({
  children,
  isDisabled,
  style,
  _active,
  _disabled,
  item,
  ...props
}, ref) => {
  const newProps = (0, _utils.omitUndefined)(props);

  const {
    inactiveTabStyle,
    activeTabStyle,
    state,
    isFitted
  } = _react.default.useContext(_Context.TabsContext);

  let tabRef = _react.default.useRef(null);

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);
  let isSelected = state.selectedKey === item.key;
  let {
    tabProps
  } = (0, _tabs.useTab)({
    item,
    isDisabled
  }, state, tabRef);

  _react.default.useEffect(() => {
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
  const mergedProps = (0, _lodash.default)(remainingTabStyle, newProps);

  const [marginalProps, remainingProps] = _theme.themeTools.extractInObject(mergedProps, ['margin', 'm', 'marginTop', 'mt', 'marginRight', 'mr', 'marginBottom', 'mb', 'marginLeft', 'ml', 'marginX', 'mx', 'marginY', 'my']); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(TabContext.Provider, {
    value: {
      isSelected
    }
  }, /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    disabled: isDisabled,
    ref: (0, _utils2.mergeRefs)([tabRef, _ref, ref]),
    flex: isFitted ? 1 : undefined
  }, tabProps, marginalProps), /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, remainingProps, isHovered && _hover, {
    style: [style, isSelected && _active, isDisabled && _disabled]
  }), children)));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Tab));

exports.default = _default;
//# sourceMappingURL=Tab.js.map