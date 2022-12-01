function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from '../../primitives/Input';
import { NumberInputContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

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
  } = React.useContext(NumberInputContext);

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


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({
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

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(NumberInputFiled));
//# sourceMappingURL=NumberInputField.js.map