function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { Stack } from '../Stack';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(({
  children,
  divider,
  variant,
  ...props
}, ref) => {
  const {
    space,
    direction,
    size,
    colorScheme,
    isDisabled,
    isAttached,
    ...newProps
  } = usePropsResolution('ButtonGroup', props);
  const {
    borderRadius
  } = usePropsResolution('Button', props);
  let computedChildren;

  if (Array.isArray(children)) {
    computedChildren = React.Children.toArray(children).map((child, index) => {
      if (typeof child === 'string' || typeof child === 'number') return child;
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-group-child-".concat(index),
        variant,
        size,
        colorScheme,
        isDisabled,
        // when buttons are attached, remove rounded corners of all buttons except extreme buttons
        ...(isAttached ? {
          borderRadius: 0
        } : {}),
        ...(isAttached && index === 0 ? direction === 'column' ? {
          borderTopRadius: borderRadius
        } : {
          borderLeftRadius: borderRadius
        } : {}),
        ...(isAttached && index === (children === null || children === void 0 ? void 0 : children.length) - 1 ? direction === 'column' ? {
          borderBottomRadius: borderRadius
        } : {
          borderRightRadius: borderRadius
        } : {}),
        //when buttons are attached, remove double border from them, just keep borderRight in case for direction row and borderBottom in case of direction column for every component
        ...(isAttached && index !== 0 ? direction === 'column' ? {
          borderTopWidth: 0
        } : {
          borderLeftWidth: 0
        } : {}),
        ...child.props
      });
    });
  } else {
    computedChildren = React.Children.toArray(children).map((child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-group-child-".concat(index),
        variant,
        size,
        colorScheme,
        isDisabled,
        ...child.props
      });
    });
  } //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Stack, _extends({
    divider: divider,
    space: isAttached ? 0 : space,
    direction: direction
  }, newProps, {
    ref: ref
  }), computedChildren);
}));
//# sourceMappingURL=ButtonGroup.js.map