function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import { usePropsResolution } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const StyledKeyboardAvoidingView = makeStyledComponent(RNKeyboardAvoidingView);
export const KeyboardAvoidingView = /*#__PURE__*/forwardRef((props, ref) => {
  const { ...resolvedProps
  } = usePropsResolution('KeyboardAvoidingView', props, {}); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(StyledKeyboardAvoidingView, _extends({}, resolvedProps, {
    ref: ref
  }));
});
//# sourceMappingURL=KeyboardAvoidingView.js.map