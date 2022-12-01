function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import InputBase from './InputBase';
import Box from '../Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { useHover } from '@react-native-aria/interactions';
import { mergeRefs } from '../../../utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const InputAdvance = ({
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  onFocus,
  onBlur,
  inputProps,
  wrapperRef,
  ...props
}, ref) => {
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };

  if (InputLeftElement) {
    leftElement = InputLeftElement;
  }

  if (InputRightElement) {
    rightElement = InputRightElement;
  }

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const resolvedProps = usePropsResolution('Input', { ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered,
    isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.border, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, ...stylingProps.background, 'shadow', 'opacity']); // Extracting baseInputProps from remaining props

  const [, baseInputProps] = extractInObject(nonLayoutProps, ['variant']); //TODO: refactor for responsive prop

  if (useHasResponsiveProps({ ...props,
    InputLeftElement,
    InputRightElement,
    onFocus,
    onBlur,
    inputProps,
    wrapperRef
  })) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }, layoutProps, {
    ref: mergeRefs([_ref, wrapperRef])
  }), InputLeftElement || leftElement ? InputLeftElement || leftElement : null, /*#__PURE__*/React.createElement(InputBase, _extends({
    inputProps: inputProps,
    bg: "transparent"
  }, baseInputProps, {
    flex: 1,
    disableFocusHandling: true,
    ref: ref,
    variant: "unstyled",
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    },
    shadow: "none"
  })), InputRightElement || rightElement ? InputRightElement || rightElement : null);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(InputAdvance));
//# sourceMappingURL=InputAdvanced.js.map