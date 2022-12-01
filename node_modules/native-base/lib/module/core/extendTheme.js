import { theme as defaultTheme } from './../theme';
import mergeWith from 'lodash.mergewith';

function isFunction(value) {
  return typeof value === 'function';
}

export function extendTheme(overrides, ...restOverrides) {
  function customizer(source, override) {
    if (isFunction(source)) {
      return (...args) => {
        const sourceValue = source(...args);
        const overrideValue = isFunction(override) ? override(...args) : override;
        return mergeWith({}, sourceValue, overrideValue, customizer);
      };
    }

    return undefined;
  }

  const finalOverrides = [overrides, ...restOverrides].reduce((prevValue, currentValue) => {
    return mergeWith({}, prevValue, currentValue, customizer);
  }, defaultTheme);
  return finalOverrides;
}
//# sourceMappingURL=extendTheme.js.map