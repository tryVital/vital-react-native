"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.preprocess = exports.createTextShadowValue = exports.createBoxShadowValue = void 0;

var _normalizeColor = _interopRequireDefault(require("./normalizeColor"));

var _normalizeValueWithProperty = _interopRequireDefault(require("./normalizeValueWithProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
//@ts-nocheck
// This functions is taken from react native web
const emptyObject = {};
/**
 * Shadows
 */

const defaultOffset = {
  height: 0,
  width: 0
};

const createBoxShadowValue = style => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius
  } = style;
  const {
    height,
    width
  } = shadowOffset || defaultOffset;
  const offsetX = (0, _normalizeValueWithProperty.default)(width);
  const offsetY = (0, _normalizeValueWithProperty.default)(height);
  const blurRadius = (0, _normalizeValueWithProperty.default)(shadowRadius || 0);
  const color = (0, _normalizeColor.default)(shadowColor || 'black', shadowOpacity);

  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
    return "".concat(offsetX, " ").concat(offsetY, " ").concat(blurRadius, " ").concat(color);
  }
};

exports.createBoxShadowValue = createBoxShadowValue;

const createTextShadowValue = style => {
  const {
    textShadowColor,
    textShadowOffset,
    textShadowRadius
  } = style;
  const {
    height,
    width
  } = textShadowOffset || defaultOffset;
  const radius = textShadowRadius || 0;
  const offsetX = (0, _normalizeValueWithProperty.default)(width);
  const offsetY = (0, _normalizeValueWithProperty.default)(height);
  const blurRadius = (0, _normalizeValueWithProperty.default)(radius);
  const color = (0, _normalizeValueWithProperty.default)(textShadowColor, 'textShadowColor');

  if (color && (height !== 0 || width !== 0 || radius !== 0) && offsetX != null && offsetY != null && blurRadius != null) {
    return "".concat(offsetX, " ").concat(offsetY, " ").concat(blurRadius, " ").concat(color);
  }
};
/**
 * Preprocess styles
 */


exports.createTextShadowValue = createTextShadowValue;

const preprocess = originalStyle => {
  const style = originalStyle || emptyObject;
  const nextStyle = {};

  for (const originalProp in style) {
    const originalValue = style[originalProp];
    let prop = originalProp;
    let value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    }

    if (prop === 'elevation') continue; // Convert shadow styles

    if (prop === 'shadowColor' || prop === 'shadowOffset' || prop === 'shadowOpacity' || prop === 'shadowRadius') {
      const boxShadowValue = createBoxShadowValue(style);

      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        const {
          boxShadow
        } = style;
        prop = 'boxShadow';
        value = boxShadow ? "".concat(boxShadow, ", ").concat(boxShadowValue) : boxShadowValue;
      } else {
        continue;
      }
    } // Convert text shadow styles


    if (prop === 'textShadowColor' || prop === 'textShadowOffset' || prop === 'textShadowRadius') {
      const textShadowValue = createTextShadowValue(style);

      if (textShadowValue != null && nextStyle.textShadow == null) {
        const {
          textShadow
        } = style;
        prop = 'textShadow';
        value = textShadow ? "".concat(textShadow, ", ").concat(textShadowValue) : textShadowValue;
      } else {
        continue;
      }
    }

    nextStyle[prop] = value;
  } // $FlowIgnore


  return nextStyle;
};

exports.preprocess = preprocess;
var _default = preprocess;
exports.default = _default;
//# sourceMappingURL=preprocess.js.map