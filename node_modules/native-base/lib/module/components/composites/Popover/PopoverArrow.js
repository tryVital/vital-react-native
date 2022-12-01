function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { usePropsResolution } from '../../../hooks';
import { Popper } from '../Popper';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const PopoverArrow = /*#__PURE__*/React.forwardRef((props, ref) => {
  const resolvedProps = usePropsResolution('PopoverArrow', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Popper.Arrow, _extends({}, resolvedProps, {
    ref: ref
  }));
});
PopoverArrow.displayName = 'PopperArrow';
export default PopoverArrow;
//# sourceMappingURL=PopoverArrow.js.map