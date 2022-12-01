"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractProps = extractProps;
exports.mergeUnderscoreProps = mergeUnderscoreProps;
exports.calculateProps = calculateProps;
exports.resolveValueWithBreakpoint = exports.extractPropertyFromFunction = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.isnil"));

var _lodash3 = _interopRequireDefault(require("lodash.mergewith"));

var _lodash4 = _interopRequireDefault(require("lodash.clonedeep"));

var _base = require("./../../theme/base");

var _tools = require("./../../theme/tools");

var _useContrastText = require("../useContrastText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Extract props from theme props and omit those from props
*/

/**
 *
 * @param props Props passed by the user
 * @param theme Theme object
 * @param colorModeProps `colorMode` object
 * @param componentTheme Theme for specific components
 * @param currentBreakpoint Current breakpoint values
 * @returns Extracting props from defaultProps while overriding the props that are already present
 */
function extractProps(props, theme, {}, componentTheme, currentBreakpoint) {
  let newProps = {};

  for (let property in props) {
    // If the property exists in themePropertyMap then get its value
    if (_base.themePropertyMap[property]) {
      let propValues = extractPropertyFromFunction(property, props, theme, componentTheme);

      if (typeof propValues === 'string' || typeof propValues === 'number') {
        newProps[property] = propValues;
      } else if (!(0, _lodash2.default)(propValues)) {
        for (let nestedProp in propValues) {
          newProps[nestedProp] = (0, _lodash.default)(theme, "".concat(_base.themePropertyMap[nestedProp], ".").concat(propValues[nestedProp]), propValues[nestedProp]);
        }
      } else if (property === 'shadow') {
        let shadowProps = theme[_base.themePropertyMap[property]][props[property]];

        if (!(0, _lodash2.default)(shadowProps)) {
          newProps = { ...newProps,
            ...shadowProps
          };
        }
      } else {
        newProps[property] = resolveValueWithBreakpoint(props[property], theme.breakpoints, currentBreakpoint, property);
      }
    } else {
      newProps[property] = resolveValueWithBreakpoint(props[property], theme.breakpoints, currentBreakpoint, property);
    }
  }

  return (0, _lodash4.default)(newProps);
}
/*
Remove props from defaultProps that are already present in props
*/


function filterDefaultProps(props, defaultProps) {
  let [, resultProps] = (0, _tools.extractInObject)(defaultProps, Object.keys(props));
  return resultProps;
}
/**
 * If property is functional in componentTheme, get its returned object
 *
 * @param property : name of the prop
 * @param props : all props
 * @param theme : provided theme without components
 * @param componentTheme : component specific theme
 * @returns
 */


const extractPropertyFromFunction = (property, props, theme, componentTheme) => {
  let propValues; // Check if the entry in the theme is a function then calling it with all theme and props as params

  if (componentTheme && typeof componentTheme[_base.themePropertyMap[property]] === 'function') {
    let funcProps = componentTheme[_base.themePropertyMap[property]]({
      theme,
      ...props
    }); // Check if returned object from componentTheme is a nested object


    let isNested = Object.keys(funcProps).some(function (key) {
      return funcProps[key] && typeof funcProps[key] === 'object';
    }); // If the returned value is nested object then find the property value in it, otherwise return the whole object

    propValues = isNested ? { ...(0, _lodash.default)(funcProps, "".concat(props[property]))
    } : { ...funcProps
    };
  } else {
    // If the entry is any value other than function then return the whole object or value
    propValues = (0, _lodash.default)(componentTheme, "".concat(_base.themePropertyMap[property], ".").concat(props[property]));
  }

  return propValues;
};
/*
Merge _props and apply contrastText color if not passed by theme or user
*/


exports.extractPropertyFromFunction = extractPropertyFromFunction;

function mergeUnderscoreProps(newProps, props) {
  const _props = Object.keys(newProps).filter(propName => propName.startsWith('_'));

  _props.forEach(propName => {
    var _newProps$bg, _newProps$propName$co, _newProps$propName, _props$propName;

    // Adding color based on bg contrast if no color is given
    const bg = (_newProps$bg = newProps.bg) !== null && _newProps$bg !== void 0 ? _newProps$bg : newProps.backgroundColor;
    const textColor = bg ? {
      color: (0, _useContrastText.useContrastText)(bg, (_newProps$propName$co = (_newProps$propName = newProps[propName]) === null || _newProps$propName === void 0 ? void 0 : _newProps$propName.color) !== null && _newProps$propName$co !== void 0 ? _newProps$propName$co : (_props$propName = props[propName]) === null || _props$propName === void 0 ? void 0 : _props$propName.color)
    } : {}; // Overriding calculated props with user added props

    newProps[propName] = { ...textColor,
      ...newProps[propName],
      ...props[propName]
    };
  });

  return newProps;
}
/**
 *
 * Checks the property and resolves it if it has breakpoints
 * @param values : value from props
 * @param currentBreakpoint : current value for which breakpoint will be calculated
 * @param property : property name
 * @returns
 */


const resolveValueWithBreakpoint = (values, breakpointTheme, currentBreakpoint, property) => {
  if ((0, _tools.hasValidBreakpointFormat)(values, breakpointTheme, property)) {
    // Check the last valid breakpoint value from all values
    // If current breakpoint is `md` and we have `base` then `lg`, then last value will be taken(`base` in this case)
    return (0, _tools.findLastValidBreakpoint)(values, breakpointTheme, currentBreakpoint);
  } else {
    return values;
  }
};
/**
 * Takes all prop related data and returns the props that needs to be applied to the component
 *
 * @param theme Theme object
 * @param colorModeProps Color mode information
 * @param componentTheme Theme object for the specific component
 * @param props Props passed by the user
 * @param windowWidth Width of the current window
 * @returns props to be applied
 */


exports.resolveValueWithBreakpoint = resolveValueWithBreakpoint;

function calculateProps(theme, colorModeProps, componentTheme, props, windowWidth) {
  let currentBreakpoint = (0, _tools.getClosestBreakpoint)(theme.breakpoints, windowWidth);

  if (!props) {
    props = {};
  }

  let newProps;

  if (componentTheme) {
    // Extracting props from defaultProps
    newProps = extractProps(filterDefaultProps(props, componentTheme.defaultProps), theme, colorModeProps, componentTheme, currentBreakpoint); // Extracting props from base style

    let componentBaseStyle = typeof componentTheme.baseStyle !== 'function' ? componentTheme.baseStyle : componentTheme.baseStyle({
      theme,
      ...newProps,
      ...props,
      ...colorModeProps
    });
    newProps = (0, _lodash3.default)(newProps, componentBaseStyle, // @ts-ignore
    (objValue, srcValue, key) => {
      if (!(0, _lodash2.default)(objValue)) {
        delete newProps[key];
      }
    });
    const variant = props.variant || (0, _lodash.default)(componentTheme, 'defaultProps.variant'); // Extracting props from variant

    if (variant && componentTheme.variants && componentTheme.variants[variant]) {
      const colorScheme = props.colorScheme || (0, _lodash.default)(componentTheme, 'defaultProps.colorScheme');
      let variantProps = componentTheme.variants[variant]({ ...props,
        ...newProps,
        colorScheme,
        theme,
        ...colorModeProps
      });
      variantProps = extractProps(variantProps, theme, colorModeProps, componentTheme, currentBreakpoint); // added this to handle order of props

      newProps = (0, _lodash3.default)(newProps, variantProps, // @ts-ignore
      (objValue, srcValue, key) => {
        if (!(0, _lodash2.default)(objValue)) {
          delete newProps[key];
        }
      });
      delete newProps.variant;
      delete newProps.colorScheme;
    }
  } // Extracting props from normal props


  let extractedProps = extractProps(props, theme, colorModeProps, componentTheme, currentBreakpoint); // added this to handle order of props
  // @ts-ignore

  newProps = (0, _lodash3.default)(newProps, extractedProps, (objValue, srcValue, key) => {
    if (!(0, _lodash2.default)(objValue)) {
      delete newProps[key];
    }
  });
  newProps = mergeUnderscoreProps(newProps, props);
  return newProps;
}
//# sourceMappingURL=utils.js.map