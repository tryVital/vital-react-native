function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useFormControlContext } from './useFormControl';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { combineContextAndProps } from '../../../utils';

const FormControlHelperText = (props, ref) => {
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const resolvedProps = usePropsResolution('FormControlHelperText', combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid // isRequired: combinedProps.isRequired,

  });
  React.useEffect(() => {
    resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasHelpText(true);
    return () => {
      resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.setHasHelpText(false);
    };
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    nativeID: resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.feedbackId,
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(FormControlHelperText));
//# sourceMappingURL=FormControlHelperText.js.map