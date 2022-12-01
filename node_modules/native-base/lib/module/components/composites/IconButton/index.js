function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Pressable } from '../../primitives/Pressable';
import { Icon } from '../../primitives/Icon';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { composeEventHandlers } from '../../../utils';
import { useHover, useFocus, useIsPressed } from '../../primitives/Pressable/Pressable';
import { useFocusRing } from '@react-native-aria/focus';
import merge from 'lodash.merge';

const IconButton = ({
  icon,
  _icon: pseudoIconProp,
  children,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  isDisabled,
  ...props
}, ref) => {
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
    ...resolvedProps
  } = usePropsResolution('IconButton', { ...props,
    _icon: merge({}, pseudoIconProp, icon === null || icon === void 0 ? void 0 : icon.props)
  }, {
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled
  });
  let clonedIcon;

  if (icon) {
    clonedIcon = /*#__PURE__*/React.cloneElement(icon, { ..._icon
    });
  } //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: isDisabled,
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
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur), focusRingProps.onBlur)
  }, resolvedProps), clonedIcon || /*#__PURE__*/React.createElement(Icon, _icon, children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(IconButton));
//# sourceMappingURL=index.js.map