function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Spinner from '../Spinner';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { default as Box } from '../Box';
import HStack from '../Stack/HStack';
import { Pressable } from '../Pressable';
import { composeEventHandlers } from '../../../utils';
import { useHover, useFocus, useIsPressed } from '../../primitives/Pressable/Pressable';
import { useFocusRing } from '@react-native-aria/focus';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Button = ({
  //@ts-ignore
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  spinner,
  isDisabled,
  isLoading,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  spinnerPlacement = 'start',
  ...props
}, ref) => {
  var _props$accessibilityR;

  const {
    hoverProps,
    isHovered
  } = useHover();
  const {
    pressableProps,
    isPressed
  } = useIsPressed();
  const {
    focusProps,
    isFocused
  } = useFocus();
  const {
    isFocusVisible,
    focusProps: focusRingProps
  } = useFocusRing();
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    _text,
    _stack,
    _spinner,
    isLoadingText,
    _icon,
    ...resolvedProps
  } = usePropsResolution('Button', props, {
    isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isPressed: isPressedProp || isPressed,
    isLoading,
    isFocusVisible: isFocusVisibleProp || isFocusVisible
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (leftIcon) {
    startIcon = leftIcon;
  }

  if (rightIcon) {
    endIcon = rightIcon;
  }

  if (endIcon && /*#__PURE__*/React.isValidElement(endIcon)) {
    endIcon = React.Children.map(endIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-end-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/React.isValidElement(startIcon)) {
    startIcon = React.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-start-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  const spinnerElement = spinner ? spinner : /*#__PURE__*/React.createElement(Spinner, _extends({
    color: _text === null || _text === void 0 ? void 0 : _text.color
  }, _spinner));

  const boxChildren = child => {
    return child ? /*#__PURE__*/React.createElement(Box, {
      _text: _text
    }, child) : null;
  };

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: isDisabled || isLoading,
    ref: ref,
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus), focusRingProps.onFocus) // @ts-ignore - web only
    ,
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur), focusRingProps.onBlur)
  }, resolvedProps, {
    accessibilityRole: (_props$accessibilityR = props.accessibilityRole) !== null && _props$accessibilityR !== void 0 ? _props$accessibilityR : 'button'
  }), /*#__PURE__*/React.createElement(HStack, _extends({}, _stack, {
    test: true
  }), startIcon && !isLoading ? startIcon : null, isLoading && spinnerPlacement === 'start' ? spinnerElement : null, isLoading ? isLoadingText ? boxChildren(isLoadingText) : null : boxChildren(children), endIcon && !isLoading ? endIcon : null, isLoading && spinnerPlacement === 'end' ? spinnerElement : null));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Button));
//# sourceMappingURL=Button.js.map