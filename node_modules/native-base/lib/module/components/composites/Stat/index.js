function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box, Text, HStack } from '../../primitives';
import { useThemeProps } from '../../../hooks';
import { ChevronDownIcon, ChevronUpIcon } from '../../primitives/Icon/Icons';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const StatLabel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = useThemeProps('Stat', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Text, _extends({}, newProps._statLabel, newProps, {
    style: style
  }, props, {
    ref: ref
  }), props.children);
}));
export const StatNumber = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = useThemeProps('Stat', props);
  return /*#__PURE__*/React.createElement(Text, _extends({}, newProps._statNumber, newProps, {
    style: style,
    ref: ref
  }), props.children);
}));
export const StatHelpText = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = useThemeProps('Stat', props);
  return /*#__PURE__*/React.createElement(Box, _extends({}, newProps._statHelpText, newProps, {
    style: style,
    ref: ref
  }), props.children);
}));
export const StatArrow = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(({
  type,
  ...props
}, ref) => {
  return type === 'increase' ? /*#__PURE__*/React.createElement(ChevronUpIcon, _extends({
    ml: -1,
    color: "green.500",
    size: 8
  }, props, {
    ref: ref
  })) : /*#__PURE__*/React.createElement(ChevronDownIcon, _extends({
    ml: -1,
    color: "red.500",
    size: 8
  }, props, {
    ref: ref
  }));
}));
export const StatGroup = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(({
  style,
  ...props
}, ref) => {
  let newProps = useThemeProps('Stat', props);
  return /*#__PURE__*/React.createElement(HStack, _extends({}, newProps._statGroup, newProps, {
    ref: ref,
    style: style
  }));
}));
const StatMain = /*#__PURE__*/React.forwardRef(({
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(Box, _extends({}, props, {
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
export default Stat;
//# sourceMappingURL=index.js.map