function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { HStack } from '../../primitives/Stack';
import { useThemeProps } from '../../../hooks';
import { useFormControlContext } from '../FormControl';
import { Platform } from 'react-native';
import { PinInputContext } from './Context';
import { themeTools } from '../../../theme';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const PinInput = ({
  children,
  ...props
}, ref) => {
  let [padding, remProps] = themeTools.extractInObject(props, ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr']);
  const {
    manageFocus,
    defaultValue,
    value,
    space,
    onChange,
    ...newProps
  } = useThemeProps('PinInput', remProps);
  const formControlContext = useFormControlContext();
  const RefList = [];

  const setRefList = (ref, index) => {
    RefList[index] = ref;
  };

  const [pinInputValue, setPinInputValue] = React.useState(value || defaultValue);

  const handleChange = (newValue, fieldIndex) => {
    let temp = pinInputValue && [...pinInputValue] || [];
    temp[fieldIndex] = newValue;
    value === undefined && setPinInputValue(temp.join(''));
    onChange && onChange(temp.join(''));
    if (newValue === '' && manageFocus && fieldIndex - 1 > -1) RefList[fieldIndex - 1].current.focus();else if (newValue && manageFocus && fieldIndex + 1 < RefList.length) RefList[fieldIndex + 1].current.focus();
    return temp.join('');
  };

  const handleMultiValueChange = (newValue, fieldIndex) => {
    const pinFieldLength = RefList.length;
    const newValueLength = newValue.length;

    if (newValueLength >= pinFieldLength && newValueLength > 2) {
      let splicedValue = newValue ? [...newValue] : [];
      splicedValue.splice(pinFieldLength);
      RefList[pinFieldLength - 1].current.focus();
      setPinInputValue(splicedValue.join(''));
      onChange && onChange(splicedValue.join(''));
    }

    if (Platform.OS !== 'ios') {
      let temp = pinInputValue ? [...pinInputValue] : [];

      if (newValue === '') {
        // Handling Backward focus.
        temp = temp.filter((_n, i) => i !== fieldIndex);
        if (manageFocus && fieldIndex - 1 > -1) RefList[fieldIndex - 1].current.focus();
      } else {
        temp[fieldIndex] = JSON.stringify(parseInt(newValue, 10) % 10);
        if (manageFocus && fieldIndex + 1 < RefList.length) RefList[fieldIndex + 1].current.focus();
      }

      value === undefined && setPinInputValue(temp.join(''));
      onChange && onChange(temp.join(''));
    }
  };

  const indexSetter = allChildren => {
    let pinInputFiledCounter = -1;
    return React.Children.map(allChildren, child => {
      pinInputFiledCounter++;
      return /*#__PURE__*/React.cloneElement(child, {
        fieldIndex: pinInputFiledCounter
      }, child.props.children);
    });
  };

  React.useEffect(() => {
    if (value !== undefined && value != pinInputValue) setPinInputValue(value);
  }, [value, pinInputValue, setPinInputValue]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(PinInputContext.Provider, {
    value: { ...formControlContext,
      ...newProps,
      setRefList,
      handleChange,
      handleMultiValueChange,
      value: pinInputValue
    }
  }, children && /*#__PURE__*/React.createElement(HStack, _extends({
    flexDirection: "row",
    space: space
  }, padding, {
    ref: ref
  }), indexSetter(children)));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(PinInput));
//# sourceMappingURL=PinInput.js.map