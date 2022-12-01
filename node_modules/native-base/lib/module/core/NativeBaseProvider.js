import React from 'react';
import { SafeAreaProvider, initialWindowMetrics as defaultInitialWindowMetrics } from 'react-native-safe-area-context';
import { SSRProvider } from '@react-native-aria/utils';
import { theme as defaultTheme } from './../theme';
import HybridProvider from './hybrid-overlay/HybridProvider';
import { OverlayProvider } from '@react-native-aria/overlays';
import { ToastProvider, ToastRef } from '../components/composites/Toast';
import { defaultConfig, NativeBaseConfigProvider } from './NativeBaseContext';
import { useToast } from '../components/composites/Toast';
import { Platform, useWindowDimensions } from 'react-native';
import { getClosestBreakpoint, platformSpecificSpaceUnits } from '../theme/tools/utils';
import { ResponsiveQueryProvider } from '../utils/useResponsiveQuery'; // For SSR to work, we need to pass initial insets as 0 values on web.
// https://github.com/th3rdwave/react-native-safe-area-context/issues/132

const defaultInitialWindowMetricsBasedOnPlatform = Platform.select({
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
  default: defaultInitialWindowMetrics
});

const NativeBaseProvider = props => {
  var _config$theme, _useWindowDimensions;

  const {
    colorModeManager,
    config = defaultConfig,
    children,
    theme: propsTheme = defaultTheme,
    initialWindowMetrics,
    isSSR,
    disableContrastText
  } = props;
  const theme = (_config$theme = config.theme) !== null && _config$theme !== void 0 ? _config$theme : propsTheme;
  const newTheme = React.useMemo(() => {
    if (config.enableRem) {
      return platformSpecificSpaceUnits(theme);
    }

    return theme;
  }, [config.enableRem, theme]);
  const windowWidth = (_useWindowDimensions = useWindowDimensions()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width;
  const currentBreakpoint = React.useMemo(() => getClosestBreakpoint(newTheme.breakpoints, windowWidth), [windowWidth, newTheme.breakpoints]);
  return /*#__PURE__*/React.createElement(NativeBaseConfigProvider, {
    theme: newTheme,
    config: config,
    currentBreakpoint: currentBreakpoint,
    isSSR: isSSR,
    disableContrastText: disableContrastText
  }, /*#__PURE__*/React.createElement(SafeAreaProvider, {
    initialMetrics: initialWindowMetrics !== null && initialWindowMetrics !== void 0 ? initialWindowMetrics : defaultInitialWindowMetricsBasedOnPlatform
  }, /*#__PURE__*/React.createElement(ResponsiveQueryProvider, {
    disableCSSMediaQueries: !isSSR
  }, /*#__PURE__*/React.createElement(HybridProvider, {
    colorModeManager: colorModeManager,
    options: theme.config
  }, /*#__PURE__*/React.createElement(OverlayProvider, null, /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement(InitializeToastRef, null), /*#__PURE__*/React.createElement(SSRProvider, null, children)))))));
};

const InitializeToastRef = () => {
  const toast = useToast();
  ToastRef.current = toast;
  return null;
};

export { NativeBaseProvider };
//# sourceMappingURL=NativeBaseProvider.js.map