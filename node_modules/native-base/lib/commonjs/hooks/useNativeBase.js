"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNativeBase = useNativeBase;

var _colorMode = require("./../core/color-mode");

var _useTheme = require("./useTheme");

/**
 *
 * @returns object containing `colorMode` information and `theme` object
 */
function useNativeBase() {
  const colorModeResult = (0, _colorMode.useColorMode)();
  const theme = (0, _useTheme.useTheme)();
  return { ...colorModeResult,
    theme
  };
}
//# sourceMappingURL=useNativeBase.js.map