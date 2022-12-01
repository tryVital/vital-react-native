"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Context = require("./Context");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  } = _react.default.useContext(_Context.TabsContext); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    flexDirection: "row",
    width: "100%",
    justifyContent: isFitted ? 'space-between' : align
  }, tabListProps, tabBarStyle, props, {
    ref: (0, _utils.mergeRefs)([ref, tablistRef])
  }), [...state.collection].map(item => /*#__PURE__*/_react.default.cloneElement(item.rendered, {
    item,
    key: item.key
  })));
};

const TabBar = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(TabBarImpl));

TabBar.displayName = 'TabBar';
var _default = TabBar;
exports.default = _default;
//# sourceMappingURL=TabBar.js.map