"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StatGroup = exports.StatArrow = exports.StatHelpText = exports.StatNumber = exports.StatLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _primitives = require("../../primitives");

var _hooks = require("../../../hooks");

var _Icons = require("../../primitives/Icon/Icons");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StatLabel = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = (0, _hooks.useThemeProps)('Stat', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_primitives.Text, _extends({}, newProps._statLabel, newProps, {
    style: style
  }, props, {
    ref: ref
  }), props.children);
}));

exports.StatLabel = StatLabel;

const StatNumber = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = (0, _hooks.useThemeProps)('Stat', props);
  return /*#__PURE__*/_react.default.createElement(_primitives.Text, _extends({}, newProps._statNumber, newProps, {
    style: style,
    ref: ref
  }), props.children);
}));

exports.StatNumber = StatNumber;

const StatHelpText = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = (0, _hooks.useThemeProps)('Stat', props);
  return /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({}, newProps._statHelpText, newProps, {
    style: style,
    ref: ref
  }), props.children);
}));

exports.StatHelpText = StatHelpText;

const StatArrow = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  type,
  ...props
}, ref) => {
  return type === 'increase' ? /*#__PURE__*/_react.default.createElement(_Icons.ChevronUpIcon, _extends({
    ml: -1,
    color: "green.500",
    size: 8
  }, props, {
    ref: ref
  })) : /*#__PURE__*/_react.default.createElement(_Icons.ChevronDownIcon, _extends({
    ml: -1,
    color: "red.500",
    size: 8
  }, props, {
    ref: ref
  }));
}));

exports.StatArrow = StatArrow;

const StatGroup = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = (0, _hooks.useThemeProps)('Stat', props);
  return /*#__PURE__*/_react.default.createElement(_primitives.HStack, _extends({}, newProps._statGroup, newProps, {
    ref: ref,
    style: style
  }));
}));

exports.StatGroup = StatGroup;

const StatMain = /*#__PURE__*/_react.default.forwardRef(({
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({}, props, {
    ref: ref,
    style: style
  }));
});

const StatTemp = StatMain;
StatTemp.Label = StatLabel;
StatTemp.Number = StatNumber;
StatTemp.HelpText = StatHelpText;
StatTemp.Arrow = StatArrow;
StatTemp.Group = StatGroup;
const Stat = StatTemp;
var _default = Stat;
exports.default = _default;
//# sourceMappingURL=index.js.map