function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { AlertDialogContext } from './Context';
import { usePropsResolution } from '../../../hooks';
import { Pressable } from '../../primitives/Pressable';
import { CloseIcon } from '../../primitives/Icon/Icons';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useHover, useFocus, useIsPressed } from '../../primitives/Pressable/Pressable';
import { composeEventHandlers } from '../../../utils';
import { useFocusRing } from '@react-native-aria/focus';

const AlertDialogCloseButton = (props, ref) => {
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
    _icon,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...rest
  } = usePropsResolution('AlertDialogCloseButton', props, {
    isHovered,
    isPressed,
    isFocused,
    isFocusVisible
  });
  const {
    handleClose
  } = React.useContext(AlertDialogContext); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    accessibilityRole: "button",
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
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur), focusRingProps.onBlur),
    onPress: handleClose
  }, rest), /*#__PURE__*/React.createElement(CloseIcon, _icon));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(AlertDialogCloseButton));
//# sourceMappingURL=AlertDialogCloseButton.js.map