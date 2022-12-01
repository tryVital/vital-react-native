"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = require("../../primitives/Input");

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const NumberInputFiled = ({
  isDisabled,
  ...props
}, ref) => {
  const {
    handleChange,
    handleChangeWithoutCheck,
    numberInputStepper,
    numberInputValue,
    isControlled,
    ...context
  } = _react.default.useContext(_Context.NumberInputContext);

  const changeHandler = inputValue => {
    let minusIndex = inputValue.indexOf('-');

    if (minusIndex !== -1 && minusIndex !== 0) {
      inputValue = inputValue.replace('-', '');
      inputValue = '-' + inputValue;
    }

    const value = parseInt(inputValue, 10);
    if (isControlled) handleChange && handleChange(value);else if (value) handleChangeWithoutCheck && handleChangeWithoutCheck(value);else handleChangeWithoutCheck && handleChangeWithoutCheck(0);
  };

  const blurHandler = () => {
    if (numberInputValue) handleChange && handleChange(numberInputValue);
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Input.Input, _extends({
    p: 0,
    pl: 2
  }, context, props, {
    onBlur: () => blurHandler(),
    isDisabled: isDisabled || context.isDisabled,
    onChangeText: inputValue => changeHandler(inputValue),
    keyboardType: "numeric",
    value: "".concat(numberInputValue),
    InputRightElement: numberInputStepper,
    ref: ref
  })));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(NumberInputFiled));

exports.default = _default;
//# sourceMappingURL=NumberInputField.js.map