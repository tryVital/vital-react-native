function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { VStack, Box } from '../../primitives';
import { useThemeProps } from '../../../hooks';
import { NumberInputContext } from './Context';
import { ChevronUpIcon, ChevronDownIcon } from '../../primitives/Icon/Icons';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const NBStepper = /*#__PURE__*/React.forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    style,
    isIncrement,
    disablitityCheck,
    _active,
    _disabled,
    isDisabled,
    accessibilityLabel,
    pressHandler,
    iconColor,
    ...newProps
  } = useThemeProps('NumberInputStepper', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 0.2,
    disabled: disablitityCheck || isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    ref: ref
  }, /*#__PURE__*/React.createElement(Box, _extends({}, newProps, _active, disablitityCheck || isDisabled ? _disabled : {}, {
    borderColor: "transparent",
    style: style,
    opacity: disablitityCheck || isDisabled ? 0.4 : 1
  }, Platform.OS === 'web' ? {
    disabled: disablitityCheck || isDisabled,
    cursor: disablitityCheck || isDisabled ? 'not-allowed' : 'auto'
  } : {}), children || isIncrement ? /*#__PURE__*/React.createElement(ChevronUpIcon, {
    color: iconColor
  }) : /*#__PURE__*/React.createElement(ChevronDownIcon, {
    color: iconColor
  })));
});

const NumberInputStepper = ({
  children,
  ...props
}, ref) => {
  const {
    //@ts-ignore
    numberInputStepper,
    setNumberInputStepper
  } = React.useContext(NumberInputContext);
  React.useEffect(() => {
    !numberInputStepper && setNumberInputStepper( /*#__PURE__*/React.createElement(VStack, _extends({}, props, {
      ref: ref
    }), children));
  }, [numberInputStepper, setNumberInputStepper, props, children, ref]);
  return null;
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(NumberInputStepper));
//# sourceMappingURL=NumberInputStepper.js.map