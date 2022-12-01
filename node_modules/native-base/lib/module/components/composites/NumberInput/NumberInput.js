import React from 'react';
import { useThemeProps } from '../../../hooks';
import { useFormControlContext } from '../FormControl';
import { NumberInputContext } from './Context';
import Box from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const NumberInput = ({
  children,
  ...props
}, ref) => {
  const {
    defaultValue,
    keepWithinRange,
    value,
    min,
    max,
    onChange,
    ...newProps
  } = useThemeProps('NumberInput', props);
  const formControlContext = useFormControlContext();
  const [numberInputValue, setNumberInputValue] = React.useState(parseInt(value || defaultValue, 10));
  const [numberInputStepper, setNumberInputStepper] = React.useState(null);

  const handleChange = newValue => {
    const temp = newValue;
    setNumberInputValue(temp);

    if (keepWithinRange) {
      if (newValue < min) setNumberInputValue(min);else if (newValue > max) setNumberInputValue(max);
    } //NOTE: only calling onChange on stepper click or blur event of input.


    onChange && onChange(temp);
  };

  const handleChangeWithoutCheck = newValue => {
    const temp = newValue;
    setNumberInputValue(temp);
  };

  React.useEffect(() => {
    if (value !== undefined && value != numberInputValue) setNumberInputValue(value);
  }, [value, numberInputValue, setNumberInputValue]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, {
    ref: ref
  }, /*#__PURE__*/React.createElement(NumberInputContext.Provider, {
    value: { ...formControlContext,
      ...newProps,
      min,
      max,
      handleChange,
      handleChangeWithoutCheck,
      numberInputValue,
      numberInputStepper,
      setNumberInputStepper,
      isControlled: value !== undefined
    }
  }, children));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(NumberInput));
//# sourceMappingURL=NumberInput.js.map