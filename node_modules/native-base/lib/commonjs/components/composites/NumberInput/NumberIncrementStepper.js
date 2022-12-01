"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NumberInputStepper = require("./NumberInputStepper");

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const NumberIncrementStepper = ({
  children,
  isDisabled: pIsDisabled,
  ...props
}, ref) => {
  const {
    numberInputValue = 0,
    step = 1,
    max = +Infinity,
    handleChange,
    ...context
  } = _react.default.useContext(_Context.NumberInputContext);

  const isDisabled = pIsDisabled || context.isDisabled;

  const pressHandler = () => {
    handleChange && handleChange(numberInputValue + step);
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_NumberInputStepper.NBStepper, _extends({
    isIncrement: true,
    isDisabled: isDisabled,
    pressHandler: pressHandler,
    disablitityCheck: numberInputValue + step > max
  }, props, {
    ref: ref
  }), children);
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(NumberIncrementStepper));

exports.default = _default;
//# sourceMappingURL=NumberIncrementStepper.js.map