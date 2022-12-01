import { extractInObject } from './../theme/tools/';
import isEmpty from 'lodash.isempty';
export const filterShadowProps = (props, ignoredProps, OS) => {
  var _ignoredProps$style;

  if (OS !== 'web') {
    return { ...ignoredProps,
      ...props
    };
  }

  let style = (_ignoredProps$style = ignoredProps.style) !== null && _ignoredProps$style !== void 0 ? _ignoredProps$style : {};
  let [shadowProps, remainingProps] = extractInObject(props, ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius']);

  if (!isEmpty(shadowProps)) {
    style = { ...style,
      ...shadowProps
    };
  }

  return { ...remainingProps,
    ...ignoredProps,
    style
  };
};
//# sourceMappingURL=filterShadowProps.js.map