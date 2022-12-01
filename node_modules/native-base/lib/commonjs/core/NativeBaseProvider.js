"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeBaseProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _utils = require("@react-native-aria/utils");

var _theme = require("./../theme");

var _HybridProvider = _interopRequireDefault(require("./hybrid-overlay/HybridProvider"));

var _overlays = require("@react-native-aria/overlays");

var _Toast = require("../components/composites/Toast");

var _NativeBaseContext = require("./NativeBaseContext");

var _reactNative = require("react-native");

var _utils2 = require("../theme/tools/utils");

var _useResponsiveQuery = require("../utils/useResponsiveQuery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For SSR to work, we need to pass initial insets as 0 values on web.
// https://github.com/th3rdwave/react-native-safe-area-context/issues/132
const defaultInitialWindowMetricsBasedOnPlatform = _reactNative.Platform.select({
  web: {
    frame: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    insets: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  default: _reactNativeSafeAreaContext.initialWindowMetrics
});

const NativeBaseProvider = props => {
  var _config$theme, _useWindowDimensions;

  const {
    colorModeManager,
    config = _NativeBaseContext.defaultConfig,
    children,
    theme: propsTheme = _theme.theme,
    initialWindowMetrics,
    isSSR,
    disableContrastText
  } = props;
  const theme = (_config$theme = config.theme) !== null && _config$theme !== void 0 ? _config$theme : propsTheme;

  const newTheme = _react.default.useMemo(() => {
    if (config.enableRem) {
      return (0, _utils2.platformSpecificSpaceUnits)(theme);
    }

    return theme;
  }, [config.enableRem, theme]);

  const windowWidth = (_useWindowDimensions = (0, _reactNative.useWindowDimensions)()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width;

  const currentBreakpoint = _react.default.useMemo(() => (0, _utils2.getClosestBreakpoint)(newTheme.breakpoints, windowWidth), [windowWidth, newTheme.breakpoints]);

  return /*#__PURE__*/_react.default.createElement(_NativeBaseContext.NativeBaseConfigProvider, {
    theme: newTheme,
    config: config,
    currentBreakpoint: currentBreakpoint,
    isSSR: isSSR,
    disableContrastText: disableContrastText
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, {
    initialMetrics: initialWindowMetrics !== null && initialWindowMetrics !== void 0 ? initialWindowMetrics : defaultInitialWindowMetricsBasedOnPlatform
  }, /*#__PURE__*/_react.default.createElement(_useResponsiveQuery.ResponsiveQueryProvider, {
    disableCSSMediaQueries: !isSSR
  }, /*#__PURE__*/_react.default.createElement(_HybridProvider.default, {
    colorModeManager: colorModeManager,
    options: theme.config
  }, /*#__PURE__*/_react.default.createElement(_overlays.OverlayProvider, null, /*#__PURE__*/_react.default.createElement(_Toast.ToastProvider, null, /*#__PURE__*/_react.default.createElement(InitializeToastRef, null), /*#__PURE__*/_react.default.createElement(_utils.SSRProvider, null, children)))))));
};

exports.NativeBaseProvider = NativeBaseProvider;

const InitializeToastRef = () => {
  const toast = (0, _Toast.useToast)();
  _Toast.ToastRef.current = toast;
  return null;
};
//# sourceMappingURL=NativeBaseProvider.js.map