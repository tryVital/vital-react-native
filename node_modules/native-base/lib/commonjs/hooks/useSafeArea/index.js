"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSafeArea = useSafeArea;

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _utils = require("./utils");

var _useTheme = require("./../useTheme");

function useSafeArea(props) {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const sizes = (0, _useTheme.useTheme)().sizes;
  const {
    safeAreaProps,
    paddingProps,
    sansPaddingProps
  } = (0, _utils.getSortedProps)(props);

  if (!Object.keys(safeAreaProps).length) {
    return props;
  }

  let calcualtedPaddingProps = (0, _utils.calculatePaddingProps)(safeAreaProps, paddingProps, insets, sizes);
  return { ...sansPaddingProps,
    ...paddingProps,
    ...calcualtedPaddingProps
  };
}
//# sourceMappingURL=index.js.map