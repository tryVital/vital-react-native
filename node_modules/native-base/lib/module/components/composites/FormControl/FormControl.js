function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import Box from '../../primitives/Box';
import { useFormControlProvider, FormControlContext } from './useFormControl';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const FormControl = (props, ref) => {
  const {
    htmlProps,
    ...context
  } = useFormControlProvider(props);
  const resolvedProps = usePropsResolution('FormControl', props, {
    isDisabled: context.isDisabled,
    isReadOnly: context.isReadOnly,
    isInvalid: context.isInvalid // isRequired: context.isRequired,

  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(FormControlContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, htmlProps, {
    ref: ref
  })));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(FormControl));
//# sourceMappingURL=FormControl.js.map