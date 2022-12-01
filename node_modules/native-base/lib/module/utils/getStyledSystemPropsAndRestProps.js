import { propConfig } from '../theme/styled-system';
/**
 * Common Logic Sharing between useSx and useStyledSystemPropResolver
 * @param props
 * @returns { styledSystemProps, restProps }
 */

export const getStyledSystemPropsAndRestProps = props => {
  const styledSystemProps = {};
  const restProps = {};

  for (let key in props) {
    if (key in propConfig) {
      styledSystemProps[key] = props[key];
    } else {
      restProps[key] = props[key];
    }
  }

  return {
    styledSystemProps,
    restProps
  };
};
//# sourceMappingURL=getStyledSystemPropsAndRestProps.js.map