"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBreakpointValue = useBreakpointValue;

var _reactNative = require("react-native");

var _tools = require("../theme/tools");

var _useTheme = require("./../hooks/useTheme");

function useBreakpointValue(values) {
  var _useWindowDimensions;

  let windowWidth = (_useWindowDimensions = (0, _reactNative.useWindowDimensions)()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width;
  const theme = (0, _useTheme.useTheme)();

  if ((0, _tools.hasValidBreakpointFormat)(values, theme.breakpoints)) {
    let currentBreakpoint = (0, _tools.getClosestBreakpoint)(theme.breakpoints, windowWidth);
    return (0, _tools.findLastValidBreakpoint)(values, theme.breakpoints, currentBreakpoint);
  } else {
    return values;
  }
}
//# sourceMappingURL=useBreakpointValue.js.map