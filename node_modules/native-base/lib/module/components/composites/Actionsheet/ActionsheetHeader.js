function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ActionsheetHeader = (props, ref) => {
  const resolvedProps = usePropsResolution('ActionsheetHeader', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    justifyContent: "center",
    alignItems: "center"
  }, resolvedProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ActionsheetHeader));
//# sourceMappingURL=ActionsheetHeader.js.map