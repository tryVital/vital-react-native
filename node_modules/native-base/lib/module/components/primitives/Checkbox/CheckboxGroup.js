function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createContext, memo, forwardRef } from 'react';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { useCheckboxGroup } from '@react-native-aria/checkbox';
import { useFormControlContext } from '../../composites/FormControl';
import Box from '../Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks/useThemeProps';
export const CheckboxGroupContext = /*#__PURE__*/createContext(null);

function CheckboxGroup({
  size,
  _checkbox,
  colorScheme,
  ...props
}, ref) {
  const resolvedProps = usePropsResolution('CheckboxGroup', props);
  const {
    children
  } = props;
  const state = useCheckboxGroupState(props);
  const {
    groupProps
  } = useCheckboxGroup({
    'aria-label': props.accessibilityLabel,
    ...props
  }, state);
  const formControlContext = useFormControlContext(); //TODO: refactor for responsive prop

  if (useHasResponsiveProps({ ...props,
    size,
    colorScheme
  })) {
    return null;
  }

  return /*#__PURE__*/React.createElement(CheckboxGroupContext.Provider, {
    value: {
      //@ts-ignore
      size,
      colorScheme,
      ..._checkbox,
      ...formControlContext,
      state
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, groupProps, props, {
    ref: ref
  }), children));
}

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(CheckboxGroup));
//# sourceMappingURL=CheckboxGroup.js.map