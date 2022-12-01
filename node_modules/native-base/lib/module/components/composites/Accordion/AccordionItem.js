function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Box from '../../primitives/Box';
import { AccordionContext, AccordionItemContext } from './Context';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AccordionItem = ({
  children,
  index: pIndex = 0,
  isDisabled,
  ...props
}, ref) => {
  const {
    index: cIndex,
    changeHandler
  } = React.useContext(AccordionContext);
  const { ...newProps
  } = useThemeProps('AccordionItem', props);
  const isOpen = cIndex === null || cIndex === void 0 ? void 0 : cIndex.includes(pIndex);

  const onClose = cb => {
    changeHandler && changeHandler(false, pIndex);
    cb && cb();
  };

  const onOpen = cb => {
    changeHandler && changeHandler(true, pIndex);
    cb && cb();
  };

  const childSetter = () => {
    if (typeof children === 'function') return children({
      isExpanded: isOpen,
      isDisabled
    });
    return children;
  }; //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(AccordionItemContext.Provider, {
    value: {
      index: pIndex,
      isOpen,
      isDisabled,
      onClose,
      onOpen
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({}, newProps, {
    ref: ref
  }), childSetter()));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(AccordionItem));
//# sourceMappingURL=AccordionItem.js.map