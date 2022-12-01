"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyledSystemPropsAndRestProps = void 0;

var _styledSystem = require("../theme/styled-system");

/**
 * Common Logic Sharing between useSx and useStyledSystemPropResolver
 * @param props
 * @returns { styledSystemProps, restProps }
 */
const getStyledSystemPropsAndRestProps = props => {
  const styledSystemProps = {};
  const restProps = {};

  for (let key in props) {
    if (key in _styledSystem.propConfig) {
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

exports.getStyledSystemPropsAndRestProps = getStyledSystemPropsAndRestProps;
//# sourceMappingURL=getStyledSystemPropsAndRestProps.js.map