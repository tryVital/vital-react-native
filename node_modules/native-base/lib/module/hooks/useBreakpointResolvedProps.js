import React from 'react';
import { useNativeBaseConfig } from '../core/NativeBaseContext';
import { resolveValueWithBreakpoint } from './useThemeProps/utils';
import { useTheme } from './../hooks/useTheme';
export const useBreakpointResolvedProps = props => {
  const currentBreakpoint = useNativeBaseConfig('useBreakpointResolvedProps').currentBreakpoint;
  const theme = useTheme();
  const newProps = React.useMemo(() => {
    let newProps = {};

    for (let key in props) {
      const rawValue = props[key];
      const value = resolveValueWithBreakpoint(rawValue, theme.breakpoints, currentBreakpoint, key);
      newProps[key] = value;
    }

    return newProps;
  }, [props, currentBreakpoint, theme.breakpoints]);
  return newProps;
};
//# sourceMappingURL=useBreakpointResolvedProps.js.map