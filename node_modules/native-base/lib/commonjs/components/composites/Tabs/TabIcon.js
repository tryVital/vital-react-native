"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = require("../../primitives/Icon");

var _Context = require("./Context");

var _Tab = require("./Tab");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TabIcon = (props, ref) => {
  const {
    activeIconProps,
    inactiveIconProps
  } = _react.default.useContext(_Context.TabsContext);

  const {
    isSelected
  } = _react.default.useContext(_Tab.TabContext);

  const iconProps = isSelected ? activeIconProps : inactiveIconProps; //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Icon.Icon, _extends({}, iconProps, props, {
    ref: ref
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(TabIcon));

exports.default = _default;
//# sourceMappingURL=TabIcon.js.map