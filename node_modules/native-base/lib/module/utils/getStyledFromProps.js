import { hasValidBreakpointFormat } from '../theme/tools';
import { getRNKeyAndStyleValue } from './getRNKeyAndStyleValue';

/**
 * Common Logic Sharing between useSx and useStyledSytem
 * @param styledSystemProps
 * @param theme
 * @param currentBreakpoint
 * @returns styleFromProps, responsiveStyles
 */
export const getStyledFromProps = (styledSystemProps, theme, currentBreakpoint, propConfig) => {
  let styleFromProps = {};
  let responsiveStyles = null;
  const orderedBreakPoints = Object.entries(theme.breakpoints).sort((a, b) => a[1] - b[1]);

  for (const key in styledSystemProps) {
    const rawValue = styledSystemProps[key];
    const config = propConfig[key];

    if (hasValidBreakpointFormat(rawValue, theme.breakpoints)) {
      if (!responsiveStyles) responsiveStyles = {};
      const value = rawValue;

      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          //@ts-ignore
          if (!responsiveStyles[orderedBreakPoints[i][0]]) {
            //@ts-ignore
            responsiveStyles[orderedBreakPoints[i][0]] = [];
          }

          const newStyle = getRNKeyAndStyleValue({
            config,
            value: v,
            key,
            styledSystemProps,
            theme,
            currentBreakpoint
          }); //@ts-ignore

          responsiveStyles[orderedBreakPoints[i][0]].push(newStyle);
        });
      } else {
        for (const k in value) {
          const newStyle = getRNKeyAndStyleValue({
            config,
            value: value[k],
            key,
            styledSystemProps,
            theme,
            currentBreakpoint
          });

          if (!responsiveStyles[k]) {
            responsiveStyles[k] = [];
          }

          responsiveStyles[k].push(newStyle);
        }
      }
    } else {
      const value = rawValue;
      const newStyle = getRNKeyAndStyleValue({
        config,
        value,
        key,
        styledSystemProps,
        theme,
        currentBreakpoint
      });
      styleFromProps = { ...styleFromProps,
        ...newStyle
      };
    }
  }

  return {
    styleFromProps,
    responsiveStyles
  };
};
//# sourceMappingURL=getStyledFromProps.js.map