"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = useTheme;

var _NativeBaseContext = require("./../core/NativeBaseContext");

function useTheme() {
  const theme = (0, _NativeBaseContext.useNativeBaseConfig)('useTheme').theme;

  if (!theme) {
    throw Error('useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<NativeBaseProvider />`');
  }

  return theme;
}
//# sourceMappingURL=useTheme.js.map