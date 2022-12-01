import { useWindowDimensions } from 'react-native';
import { getClosestBreakpoint, hasValidBreakpointFormat, findLastValidBreakpoint } from '../theme/tools';
import { useTheme } from './../hooks/useTheme';
export function useBreakpointValue(values) {
  var _useWindowDimensions;

  let windowWidth = (_useWindowDimensions = useWindowDimensions()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width;
  const theme = useTheme();

  if (hasValidBreakpointFormat(values, theme.breakpoints)) {
    let currentBreakpoint = getClosestBreakpoint(theme.breakpoints, windowWidth);
    return findLastValidBreakpoint(values, theme.breakpoints, currentBreakpoint);
  } else {
    return values;
  }
}
//# sourceMappingURL=useBreakpointValue.js.map