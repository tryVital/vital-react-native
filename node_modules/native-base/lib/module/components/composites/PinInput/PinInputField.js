function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from '../../primitives/Input';
import { PinInputContext } from './Context';
import { Platform } from 'react-native';
import { mergeRefs } from '../../../utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const PinInputFiled = ({
  fieldIndex = 0,
  defaultValue: pDefaultValue,
  ...props
}, ref) => {
  let {
    handleChange,
    value: cValue,
    setRefList,
    defaultValue: cDefaultValue,
    handleMultiValueChange,
    ...context
  } = React.useContext(PinInputContext);
  cDefaultValue = cDefaultValue && cDefaultValue[fieldIndex];
  let defaultValue = pDefaultValue || cDefaultValue;
  let value = cValue && cValue[fieldIndex];

  const keyPressHandler = event => {
    if (Platform.OS !== 'web') {
      if (event.nativeEvent.key >= 0 && event.nativeEvent.key <= 9) {
        handleChange && handleChange(event.nativeEvent.key, fieldIndex);
      } else if (event.nativeEvent.key === 'Backspace') {
        handleChange && handleChange('', fieldIndex);
      }
    }
  };

  const textChangeHandler = value => {
    // Also used to handle change for Android.
    handleMultiValueChange && handleMultiValueChange(value, fieldIndex);
  };

  const myRef = React.useRef(null);
  React.useEffect(() => {
    setRefList && setRefList(myRef, fieldIndex);
  }, [myRef, fieldIndex, setRefList]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Input //@ts-ignore
  , _extends({
    ref: mergeRefs([myRef, ref])
  }, context, props, {
    onKeyPress: event => keyPressHandler(event),
    onChangeText: value => textChangeHandler(value),
    keyboardType: "numeric",
    defaultValue: defaultValue,
    value: value
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(PinInputFiled));
//# sourceMappingURL=PinInputField.js.map