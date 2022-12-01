"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberInputStepper = exports.default = void 0;

var _tools = require("../tools");

const defaultProps = {
  size: 'sm',
  step: 1,
  min: -Infinity,
  max: Infinity,
  defaultValue: '0',
  keepWithinRange: true,
  clampValueOnBlur: true,
  focusInputOnChange: true,
  getAriaValueText: true
};
var _default = {
  defaultProps
}; //Steppers

exports.default = _default;

const stepperbaseStyle = props => {
  return {
    bg: (0, _tools.mode)('primary.600', 'primary.200')(props),
    iconColor: (0, _tools.mode)('gray.50', 'gray.800')(props),
    _active: {},
    _disabled: {
      // iconColor: mode('gray.50', 'gray.300')(props),
      // bg: mode('blackAlpha.200', 'whiteAlpha.300')(props),
      opacity: 0.5
    }
  };
};

const NumberInputStepper = {
  baseStyle: stepperbaseStyle
};
exports.NumberInputStepper = NumberInputStepper;
//# sourceMappingURL=number-input.js.map