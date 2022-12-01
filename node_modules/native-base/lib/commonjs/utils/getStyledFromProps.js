"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyledFromProps = void 0;

var _tools = require("../theme/tools");

var _getRNKeyAndStyleValue = require("./getRNKeyAndStyleValue");

/**
 * Common Logic Sharing between useSx and useStyledSytem
 * @param styledSystemProps
 * @param theme
 * @param currentBreakpoint
 * @returns styleFromProps, responsiveStyles
 */
const getStyledFromProps = (styledSystemProps, theme, currentBreakpoint, propConfig) => {
  let styleFromProps = {};
  let responsiveStyles = null;
  const orderedBreakPoints = Object.entries(theme.breakpoints).sort((a, b) => a[1] - b[1]);

  for (const key in styledSystemProps) {
    const rawValue = styledSystemProps[key];
    const config = propConfig[key];

    if ((0, _tools.hasValidBreakpointFormat)(rawValue, theme.breakpoints)) {
      if (!responsiveStyles) responsiveStyles = {};
      const value = rawValue;

      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          //@ts-ignore
          if (!responsiveStyles[orderedBreakPoints[i][0]]) {
            //@ts-ignore
            responsiveStyles[orderedBreakPoints[i][0]] = [];
          }

          const newStyle = (0, _getRNKeyAndStyleValue.getRNKeyAndStyleValue)({
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
          const newStyle = (0, _getRNKeyAndStyleValue.getRNKeyAndStyleValue)({
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
      const newStyle = (0, _getRNKeyAndStyleValue.getRNKeyAndStyleValue)({
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

exports.getStyledFromProps = getStyledFromProps;
//# sourceMappingURL=getStyledFromProps.js.map