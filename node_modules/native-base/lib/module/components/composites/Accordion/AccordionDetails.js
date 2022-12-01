function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { AccordionContext, AccordionItemContext } from './Context';
import Collapse from '../Collapse';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AccordionDetails = ({
  children,
  ...props
}, ref) => {
  const { ...newProps
  } = useThemeProps('AccordionDetails', props);
  const {
    isOpen
  } = React.useContext(AccordionItemContext);
  const {
    AnimationProps
  } = React.useContext(AccordionContext); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Collapse, _extends({}, AnimationProps, newProps, {
    isOpen: isOpen,
    ref: ref
  }), children);
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(AccordionDetails));
//# sourceMappingURL=AccordionDetails.js.map