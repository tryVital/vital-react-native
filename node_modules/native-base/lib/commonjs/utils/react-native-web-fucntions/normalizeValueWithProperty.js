"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeValueWithProperty;

var _unitlessNumbers = _interopRequireDefault(require("./unitlessNumbers"));

var _normalizeColor = _interopRequireDefault(require("./normalizeColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
//@ts-nocheck
// This functions is taken from react native web
const colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true
};

function normalizeValueWithProperty(value, property) {
  let returnValue = value;

  if ((property == null || !_unitlessNumbers.default[property]) && typeof value === 'number') {
    returnValue = "".concat(value, "px");
  } else if (property != null && colorProps[property]) {
    returnValue = (0, _normalizeColor.default)(value);
  }

  return returnValue;
}
//# sourceMappingURL=normalizeValueWithProperty.js.map