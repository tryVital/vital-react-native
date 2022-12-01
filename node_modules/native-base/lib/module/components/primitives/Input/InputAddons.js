function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { default as Box } from '../Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks/useThemeProps/usePropsResolution';
export const InputLeftAddon = /*#__PURE__*/memo(
/*#__PURE__*/
//@r
forwardRef((props, ref) => {
  const resolvedProps = usePropsResolution('InputLeftAddon', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), props.children);
}));
export const InputRightAddon = /*#__PURE__*/memo( /*#__PURE__*/forwardRef((props, ref) => {
  const resolvedProps = usePropsResolution('InputRightAddon', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), props.children);
}));
//# sourceMappingURL=InputAddons.js.map