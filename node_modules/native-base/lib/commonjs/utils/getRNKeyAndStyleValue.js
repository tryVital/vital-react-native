"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRNKeyAndStyleValue = void 0;

var _reactNative = require("react-native");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _convertStringNumberToNumber = require("./convertStringNumberToNumber");

var _utils = require("../hooks/useThemeProps/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Common Logic Sharing between useSx and useStyledSytem
 */
const getRNKeyAndStyleValue = ({
  config,
  value,
  key,
  theme,
  styledSystemProps,
  currentBreakpoint
}) => {
  let style = {};

  if (config === true) {
    style = { ...style,
      [key]: (0, _convertStringNumberToNumber.convertStringNumberToNumber)(key, value)
    };
  } else if (config) {
    //@ts-ignore
    const {
      property,
      scale,
      properties,
      transformer
    } = config;
    let val = value;

    if (transformer) {
      val = transformer(val, theme[scale], theme, styledSystemProps.fontSize);
    } else {
      // If a token is not found in the theme
      val = (0, _lodash.default)(theme[scale], value, value);
    }

    if (typeof val === 'string') {
      if (val.endsWith('px')) {
        val = parseFloat(val);
      } else if (val.endsWith('em') && _reactNative.Platform.OS !== 'web') {
        const fontSize = (0, _utils.resolveValueWithBreakpoint)(styledSystemProps.fontSize, theme.breakpoints, currentBreakpoint, key);
        val = parseFloat(val) * parseFloat((0, _lodash.default)(theme.fontSizes, fontSize, fontSize));
      }
    }

    val = (0, _convertStringNumberToNumber.convertStringNumberToNumber)(key, val);

    if (properties) {
      //@ts-ignore
      properties.forEach(property => {
        style = { ...style,
          [property]: val
        };
      });
    } else if (property) {
      style = { ...style,
        [property]: val
      };
    } else {
      style = { ...style,
        ...val
      };
    }
  }

  return style;
};

exports.getRNKeyAndStyleValue = getRNKeyAndStyleValue;
//# sourceMappingURL=getRNKeyAndStyleValue.js.map