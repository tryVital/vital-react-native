function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { HStack } from '../../primitives/Stack';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useFormControlContext } from './useFormControl';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { combineContextAndProps } from '../../../utils';
import Text from '../../primitives/Text';

const FormControlErrorMessage = (props, ref) => {
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const {
    leftIcon,
    rightIcon,
    children,
    _text,
    _stack,
    ...resolvedProps
  } = usePropsResolution('FormControlErrorMessage', combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid // isRequired: combinedProps.isRequired,

  });
  let {
    startIcon,
    endIcon
  } = resolvedProps;

  if (rightIcon) {
    endIcon = rightIcon;
  }

  if (leftIcon) {
    startIcon = leftIcon;
  }

  if (endIcon && /*#__PURE__*/React.isValidElement(endIcon)) {
    endIcon = React.Children.map(endIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-end-icon-".concat(index),
        ..._text,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/React.isValidElement(startIcon)) {
    startIcon = React.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "button-start-icon-".concat(index),
        ..._text,
        ...child.props
      });
    });
  }

  React.useEffect(() => {
    resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasFeedbackText(true);
    return () => {
      resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasFeedbackText(false);
    };
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return resolvedProps !== null && resolvedProps !== void 0 && resolvedProps.isInvalid && children ? /*#__PURE__*/React.createElement(Box, _extends({
    nativeID: resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.helpTextId
  }, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(HStack, _stack, startIcon, /*#__PURE__*/React.createElement(Text, _text, children), endIcon)) : null;
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(FormControlErrorMessage));
//# sourceMappingURL=FormControlErrorMessage.js.map