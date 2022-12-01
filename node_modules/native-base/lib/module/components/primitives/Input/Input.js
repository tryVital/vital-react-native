function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { useToken } from '../../../hooks';
import { useFormControl } from '../../composites/FormControl';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useHover } from '@react-native-aria/interactions';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { mergeRefs, resolveStackStyleInput } from '../../../utils';
import { Stack } from '../Stack';
import { makeStyledComponent } from '../../../utils/styled';
import { useResolvedFontFamily } from '../../../hooks/useResolvedFontFamily';
const StyledInput = makeStyledComponent(TextInput);

const Input = ({
  isHovered: isHoveredProp,
  isFocused: isFocusedProp,
  onKeyPress,
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  ...props
}, ref) => {
  const inputProps = useFormControl({
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly,
    isRequired: props.isRequired,
    nativeID: props.nativeID
  });
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };
  const {
    ariaLabel,
    accessibilityLabel,
    type,
    isFullWidth,
    isDisabled,
    isReadOnly,
    fontFamily,
    fontWeight,
    fontStyle,
    placeholderTextColor,
    selectionColor,
    underlineColorAndroid,
    onFocus,
    onBlur,
    wrapperRef,
    _stack,
    _input,
    ...resolvedProps
  } = usePropsResolution('Input', { ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.border, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, ...stylingProps.background, 'shadow', 'opacity']);
  const resolvedFontFamily = useResolvedFontFamily({
    fontFamily,
    fontWeight: fontWeight !== null && fontWeight !== void 0 ? fontWeight : 400,
    fontStyle: fontStyle !== null && fontStyle !== void 0 ? fontStyle : 'normal'
  });
  const resolvedPlaceholderTextColor = useToken('colors', placeholderTextColor);
  const resolvedSelectionColor = useToken('colors', selectionColor);
  const resolvedUnderlineColorAndroid = useToken('colors', underlineColorAndroid);
  /**Converting into Hash Color Code */
  //@ts-ignore

  resolvedProps.focusOutlineColor = useToken('colors', resolvedProps.focusOutlineColor); //@ts-ignore

  resolvedProps.invalidOutlineColor = useToken('colors', resolvedProps.invalidOutlineColor); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (resolvedProps.focusOutlineColor && isFocused) {
    layoutProps.borderColor = resolvedProps.focusOutlineColor;
    _stack.style = resolveStackStyleInput(props.variant, resolvedProps.focusOutlineColor);
  }

  if (resolvedProps.invalidOutlineColor && props.isInvalid) {
    layoutProps.borderColor = resolvedProps.invalidOutlineColor;
    _stack.style = resolveStackStyleInput(props.variant, resolvedProps.invalidOutlineColor);
  }

  return /*#__PURE__*/React.createElement(Stack, _extends({}, _stack, layoutProps, {
    ref: mergeRefs([_ref, wrapperRef]),
    isFocused: isFocused
  }), InputLeftElement || leftElement ? InputLeftElement || leftElement : null, /*#__PURE__*/React.createElement(StyledInput, _extends({}, inputProps, {
    secureTextEntry: type === 'password',
    accessible: true,
    accessibilityLabel: ariaLabel || accessibilityLabel,
    editable: isDisabled || isReadOnly ? false : true,
    w: isFullWidth ? '100%' : undefined
  }, nonLayoutProps, resolvedFontFamily, {
    placeholderTextColor: resolvedPlaceholderTextColor,
    selectionColor: resolvedSelectionColor,
    underlineColorAndroid: resolvedUnderlineColorAndroid,
    onKeyPress: e => {
      e.persist();
      onKeyPress && onKeyPress(e);
    },
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    }
  }, _input, {
    ref: mergeRefs([ref, _ref, wrapperRef])
  })), InputRightElement || rightElement ? InputRightElement || rightElement : null);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Input));
//# sourceMappingURL=Input.js.map