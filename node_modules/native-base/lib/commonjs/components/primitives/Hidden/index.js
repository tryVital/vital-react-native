"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hidden = Hidden;
exports.default = void 0;

var _react = require("react");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _hooks = require("../../../hooks");

var _hooks2 = require("../../../core/color-mode/hooks");

var _reactNative = require("react-native");

function Hidden({
  children,
  ...props
}) {
  const {
    from,
    till,
    only,
    platform,
    colorMode
  } = (0, _useThemeProps.usePropsResolution)('Hidden', props, {}, {
    ignoreProps: ['only', 'platform']
  });
  const {
    breakpoints
  } = (0, _hooks.useTheme)();
  const currentColorMode = (0, _hooks2.useColorMode)();
  const breakpointValueObject = Object.keys(breakpoints).reduce((obj, val) => {
    obj[val] = val;
    return obj;
  }, {});
  const breakpointValue = (0, _hooks.useBreakpointValue)(breakpointValueObject);
  const [currentBreakpointValue] = (0, _hooks.useToken)('breakpoints', [breakpointValue]);
  const [fromBreakPointValue] = (0, _hooks.useToken)('breakpoints', [from]);
  const [tillBreakPointValue] = (0, _hooks.useToken)('breakpoints', [till]); //if no prop is passed, it will hide the element wrapped with hidden

  if (!from && !till && !only && !colorMode && !platform) {
    return null;
  } //if from and till prop exists, it will hide the element wrapped accordingly
  else if (from && till && currentBreakpointValue >= fromBreakPointValue && currentBreakpointValue < tillBreakPointValue) {
      return null;
    } //if from prop exists, it will hide the element wrapped starting from that breakpoint.
    else if (from && !till && currentBreakpointValue >= fromBreakPointValue) {
        return null;
      } //if till prop exists, it will hide the element wrapped starting from  0 till that breakpoint.
      else if (till && !from && currentBreakpointValue < tillBreakPointValue) {
          return null;
        } //if only prop exists and is array, check that array consists current breakpoint value, and if that exists, hide on that breakpoint to next breakpoint.
        // if only prop is string, hide on that breakpoint to next breakpoint.
        else if (Array.isArray(only) && only.includes(breakpointValue) || only === breakpointValue) {
            return null;
          } //if platform prop exists and is array, check that array consists current platform value, and if that exists, hide on that platform.
          // if platform prop is string, hide on that platform.
          else if (Array.isArray(platform) && platform.includes(_reactNative.Platform.OS) || platform === _reactNative.Platform.OS) {
              return null;
            } //if colormode prop is valid string, hide on that colormode.
            else if (colorMode === currentColorMode.colorMode) {
                return null;
              }

  return children;
}

var _default = /*#__PURE__*/(0, _react.memo)(Hidden);

exports.default = _default;
//# sourceMappingURL=index.js.map