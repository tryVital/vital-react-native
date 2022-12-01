function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useKeyboardDismissable, usePropsResolution, useToken } from '../../../hooks';
import React from 'react';
import { Platform } from 'react-native';
import { Popper } from '../Popper';
import { PopoverContext } from './PopoverContext';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const PopoverContent = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _ref, _ref2, _props$bgColor;

  const {
    onClose,
    initialFocusRef,
    finalFocusRef,
    popoverContentId,
    headerMounted,
    bodyMounted,
    bodyId,
    headerId,
    isOpen
  } = React.useContext(PopoverContext);
  const resolvedProps = usePropsResolution('PopoverContent', props);
  const arrowDefaultColor = (_ref = (_ref2 = (_props$bgColor = props.bgColor) !== null && _props$bgColor !== void 0 ? _props$bgColor : props.bg) !== null && _ref2 !== void 0 ? _ref2 : props.backgroundColor) !== null && _ref !== void 0 ? _ref : resolvedProps.backgroundColor;
  const color = useToken('colors', arrowDefaultColor);
  React.useEffect(() => {
    const finalFocusRefCurrentVal = finalFocusRef === null || finalFocusRef === void 0 ? void 0 : finalFocusRef.current;

    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }

    return () => {
      if (finalFocusRefCurrentVal) {
        finalFocusRefCurrentVal.focus();
      }
    };
  }, [finalFocusRef, initialFocusRef]);
  useKeyboardDismissable({
    enabled: true,
    callback: onClose
  });
  let arrowElement = null;
  const restChildren = [];
  React.Children.toArray(props.children).forEach(child => {
    var _child$type;

    if ((child === null || child === void 0 ? void 0 : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName) === 'PopperArrow') {
      var _child$props$color;

      arrowElement = /*#__PURE__*/React.cloneElement(child, {
        backgroundColor: (_child$props$color = child.props.color) !== null && _child$props$color !== void 0 ? _child$props$color : color
      });
    } else {
      restChildren.push(child);
    }
  });
  const accessibilityProps = Platform.OS === 'web' ? {
    'accessibilityRole': 'dialog',
    'aria-labelledby': headerMounted ? headerId : undefined,
    'aria-describedby': bodyMounted ? bodyId : undefined
  } : {}; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Popper.Content, _extends({
    nativeID: popoverContentId
  }, accessibilityProps, resolvedProps, {
    ref: ref,
    isOpen: isOpen
  }), arrowElement, restChildren);
});
PopoverContent.displayName = 'PopoverContent';
//# sourceMappingURL=PopoverContent.js.map