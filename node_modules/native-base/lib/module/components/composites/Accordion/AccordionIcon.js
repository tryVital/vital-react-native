function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../../primitives/Icon/Icons';
import { AccordionItemContext } from './Context';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AccordionIcon = ({ ...props
}, ref) => {
  const {
    isOpen
  } = React.useContext(AccordionItemContext);
  const { ...newProps
  } = useThemeProps('AccordionIcon', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return isOpen ? /*#__PURE__*/React.createElement(ChevronUpIcon, _extends({
    color: "white"
  }, newProps, {
    ref: ref
  })) : /*#__PURE__*/React.createElement(ChevronDownIcon, _extends({}, newProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(AccordionIcon));
//# sourceMappingURL=AccordionIcon.js.map