import { useTheme } from './useTheme';
import get from 'lodash.get';
export function useToken(property, token, fallback) {
  const theme = useTheme();

  if (Array.isArray(token)) {
    let fallbackArr = [];

    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
    }

    return token.map((innerToken, index) => {
      var _fallbackArr$index;

      const path = "".concat(property, ".").concat(innerToken);
      return get(theme, path, (_fallbackArr$index = fallbackArr[index]) !== null && _fallbackArr$index !== void 0 ? _fallbackArr$index : innerToken);
    });
  }

  const path = "".concat(property, ".").concat(token);
  return get(theme, path, fallback !== null && fallback !== void 0 ? fallback : token);
}
//# sourceMappingURL=useToken.js.map