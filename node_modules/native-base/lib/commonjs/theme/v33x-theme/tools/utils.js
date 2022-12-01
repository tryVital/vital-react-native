"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.omitUndefined = omitUndefined;
exports.getRandomString = getRandomString;
exports.orderedExtractInObject = orderedExtractInObject;
exports.extractInObject = extractInObject;
exports.getColorFormColorScheme = getColorFormColorScheme;
exports.getColorScheme = getColorScheme;
exports.hasValidBreakpointFormat = hasValidBreakpointFormat;
exports.findLastValidBreakpoint = findLastValidBreakpoint;
exports.getClosestBreakpoint = getClosestBreakpoint;
exports.isResponsiveAnyProp = isResponsiveAnyProp;
exports.platformSpecificSpaceUnits = exports.convertToDp = exports.convertRemToAbsolute = exports.convertAbsoluteToRem = exports.baseFontSize = exports.inValidBreakpointProps = exports.stylingProps = void 0;

var _lodash = _interopRequireDefault(require("lodash.omitby"));

var _lodash2 = _interopRequireDefault(require("lodash.isnil"));

var _lodash3 = _interopRequireDefault(require("lodash.pick"));

var _lodash4 = _interopRequireDefault(require("lodash.omit"));

var _lodash5 = _interopRequireDefault(require("lodash.get"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stylingProps = {
  margin: ['margin', 'm', 'marginTop', 'mt', 'marginRight', 'mr', 'marginBottom', 'mb', 'marginLeft', 'ml', 'marginX', 'mx', 'marginY', 'my'],
  padding: ['padding', 'p', 'paddingTop', 'pt', 'paddingRight', 'pr', 'paddingBottom', 'pb', 'paddingLeft', 'pl', 'paddingX', 'px', 'paddingY', 'py'],
  border: ['border', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'borderTop', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderRight', 'borderRightWidth', 'borderRightStyle', 'borderRightColor', 'borderBottom', 'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderLeft', 'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor', 'borderX', 'borderY'],
  layout: ['width', 'w', 'height', 'h', 'display', 'minWidth', 'minW', 'minH', 'minHeight', 'maxWidth', 'maxW', 'maxHeight', 'maxH', 'size', 'verticalAlign', 'overflow', 'overflowX', 'overflowY'],
  flexbox: ['alignItems', 'alignContent', 'justifyItems', 'justifyContent', 'flexWrap', 'flexDirection', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'justifySelf', 'alignSelf', 'order'],
  position: ['position', 'zIndex', 'top', 'right', 'bottom', 'left'],
  background: ['bg', 'backgroundColor', 'bgColor']
};
exports.stylingProps = stylingProps;

function omitUndefined(obj) {
  return (0, _lodash.default)(obj, _lodash2.default);
}

function getRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
} // Inefficient way for pick, but retains order of props.


function orderedPick(obj, values) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    if (values.includes(key)) {
      ret[key] = obj[key];
    }
  });
  return ret;
}

function orderedExtractInObject(parent, values) {
  return [omitUndefined(orderedPick(parent, values)), omitUndefined((0, _lodash4.default)(parent, values))];
}
/**
 *
 * @param parent The object from which data needs to extracted
 * @param values Keys which needs to be extracted
 * @returns [extractedProps, remainingProps]
 */


function extractInObject(parent, values) {
  return [omitUndefined((0, _lodash3.default)(parent, values)), omitUndefined((0, _lodash4.default)(parent, values))];
}

function getColorFormColorScheme(props) {
  const {
    theme,
    colorScheme,
    isDisabled
  } = props;
  const simpleColorScheme = colorScheme.split('.')[0];
  if (isDisabled) return 'gray.300';else if (simpleColorScheme in theme.colors) {
    return theme.colors[simpleColorScheme][0] === '#' ? simpleColorScheme : theme.colors[simpleColorScheme][400] || theme.colors[simpleColorScheme][200];
  } else return 'primary.200';
} // TODO: This function can be removed.


function getColorScheme(props, customColorScheme) {
  let {
    theme,
    colorScheme
  } = props;
  colorScheme = customColorScheme || colorScheme;
  if (!(colorScheme in theme.colors)) return 'primary';else {
    if (typeof theme.colors[colorScheme] === 'object') return colorScheme;
  }
}

const inValidBreakpointProps = ['style', 'children', 'shadowOffset'];
exports.inValidBreakpointProps = inValidBreakpointProps;

function hasValidBreakpointFormat(breaks, themeBreakpoints, property) {
  if (property && inValidBreakpointProps.indexOf(property) !== -1) {
    return false;
  } else if (Array.isArray(breaks)) {
    return breaks.length ? true : false;
  } else if (typeof breaks === 'object' && breaks !== null) {
    const keys = Object.keys(breaks);
    const themeBreakPointKeys = Object.keys(themeBreakpoints);

    for (let i = 0; i < keys.length; i++) {
      if (themeBreakPointKeys.indexOf(keys[i]) === -1) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

function findLastValidBreakpoint(values, themeBreakpoints, currentBreakpoint) {
  var _valArray$currentBrea;

  const valArray = Array.isArray(values) ? values : Object.keys(themeBreakpoints).map(bPoint => values[bPoint]);
  return (_valArray$currentBrea = valArray[currentBreakpoint]) !== null && _valArray$currentBrea !== void 0 ? _valArray$currentBrea : valArray.slice(0, currentBreakpoint + 1).filter(v => !(0, _lodash2.default)(v)).pop();
}

function getClosestBreakpoint(values, point) {
  const dimValues = Object.values(values);
  let index = -1;
  let breakpointsObj = {};

  for (let i = 0; i < dimValues.length; i++) {
    breakpointsObj[dimValues[i]] = i;
  }

  const breakpoints = Object.keys(breakpointsObj);

  for (let i = 0; i < breakpoints.length; i++) {
    if (parseInt(breakpoints[i]) === point) {
      index = breakpointsObj[breakpoints[i]];
      break;
    } else if (parseInt(breakpoints[i]) > point && i !== 0) {
      index = breakpointsObj[breakpoints[i - 1]];
      break;
    } // If windowWidth is greater than last available breakpoint clamp it to last index
    else if (parseInt(breakpoints[i]) < point && i === dimValues.length - 1) {
        index = breakpointsObj[breakpoints[i]];
        break;
      }
  }

  return index;
}

const baseFontSize = 16;
exports.baseFontSize = baseFontSize;

const convertAbsoluteToRem = px => {
  return "".concat(px / baseFontSize, "rem");
};

exports.convertAbsoluteToRem = convertAbsoluteToRem;

const convertRemToAbsolute = rem => {
  return rem * baseFontSize;
};

exports.convertRemToAbsolute = convertRemToAbsolute;

const convertToDp = value => {
  const numberRegex = /^\d+$/;

  if (typeof value === 'number') {
    return value;
  } else {
    const isAbsolute = numberRegex.test(value);
    const isPx = !isAbsolute && value.endsWith('px');
    const isRem = !isAbsolute && value.endsWith('rem');
    const isEm = !isAbsolute && value.endsWith('em');
    let finalDpValue = 0;

    if (isAbsolute || isPx) {
      finalDpValue = parseFloat(value);
    } else if (isEm) {
      finalDpValue = convertRemToAbsolute(parseFloat(value));
    } else if (isRem) {
      finalDpValue = convertRemToAbsolute(parseFloat(value));
    }

    return finalDpValue;
  }
};
/**
 *
 * @param theme
 * @description
  - Converts space/sizes/lineHeights/letterSpacings/fontSizes to `rem` on web if the token value specified is an absolute number.
  - Converts space/sizes/lineHeights/letterSpacings/fontSizes to absolute number on native if the token value specified is in `px` or `rem`
*/


exports.convertToDp = convertToDp;

const platformSpecificSpaceUnits = theme => {
  const scales = ['space', 'sizes', 'fontSizes'];
  const newTheme = { ...theme
  };
  const isWeb = _reactNative.Platform.OS === 'web';
  scales.forEach(key => {
    const scale = (0, _lodash5.default)(theme, key, {});
    const newScale = { ...scale
    };

    for (const scaleKey in scale) {
      const val = scale[scaleKey];

      if (typeof val !== 'object') {
        const isAbsolute = typeof val === 'number';
        const isPx = !isAbsolute && val.endsWith('px');
        const isRem = !isAbsolute && val.endsWith('rem'); // If platform is web, we need to convert absolute unit to rem. e.g. 16 to 1rem

        if (isWeb) {
          if (isAbsolute) {
            newScale[scaleKey] = convertAbsoluteToRem(val);
          }
        } // If platform is not web, we need to convert px unit to absolute and rem unit to absolute. e.g. 16px to 16. 1rem to 16.
        else {
            if (isRem) {
              newScale[scaleKey] = convertRemToAbsolute(parseFloat(val));
            } else if (isPx) {
              newScale[scaleKey] = parseFloat(val);
            }
          }
      }
    } //@ts-ignore


    newTheme[key] = newScale;
  });
  return newTheme;
};

exports.platformSpecificSpaceUnits = platformSpecificSpaceUnits;

function isResponsiveAnyProp(props, theme) {
  if (props) {
    const keys = Object.keys(props);

    for (let i = 0; i < keys.length; i++) {
      if (hasValidBreakpointFormat(props[keys[i]], theme.breakpoints, keys[i])) {
        return true;
      }
    }
  }

  return false;
}
//# sourceMappingURL=utils.js.map