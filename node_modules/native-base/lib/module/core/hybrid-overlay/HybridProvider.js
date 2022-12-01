import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { HybridContext } from './Context';
import { useModeManager } from './../color-mode/hooks';
import { keyboardDismissHandlerManager } from '../../hooks';

const HybridProvider = ({
  children,
  options: {
    initialColorMode = 'light',
    accessibleColors: isTextColorAccessible = false,
    useSystemColorMode
  },
  colorModeManager
}) => {
  // Color-mode content
  const {
    colorMode,
    setColorMode
  } = useModeManager(initialColorMode, useSystemColorMode, colorModeManager);
  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]); // Accessible color hook

  const [accessibleColors, setAccessibleColors] = React.useState(isTextColorAccessible);
  const contextValue = useMemo(() => {
    return {
      colorMode: {
        colorMode,
        toggleColorMode,
        setColorMode,
        accessibleColors,
        setAccessibleColors
      }
    };
  }, [colorMode, toggleColorMode, setColorMode, accessibleColors, setAccessibleColors]);
  React.useEffect(() => {
    let escapeKeyListener = null;

    if (Platform.OS === 'web') {
      escapeKeyListener = e => {
        if (e.key === 'Escape') {
          if (keyboardDismissHandlerManager.length() > 0) {
            const lastHandler = keyboardDismissHandlerManager.pop();
            lastHandler();
          }
        }
      };

      document.addEventListener('keydown', escapeKeyListener);
    }

    return () => {
      if (Platform.OS === 'web') {
        document.removeEventListener('keydown', escapeKeyListener);
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(HybridContext.Provider, {
    value: contextValue
  }, children);
};

export default HybridProvider;
//# sourceMappingURL=HybridProvider.js.map