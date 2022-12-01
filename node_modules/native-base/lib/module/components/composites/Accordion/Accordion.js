function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Box from '../../primitives/Box';
import { useThemeProps } from '../../../hooks';
import getIndexedChildren from '../../../utils/getIndexedChildren';
import { AccordionContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Accordion = ({
  children,
  index: pIndex,
  defaultIndex,
  allowMultiple,
  allowToggle,
  onChange,
  ...props
}, ref) => {
  const {
    endingHeight,
    startingHeight,
    duration,
    isOpen,
    onAnimationEnd,
    onAnimationStart,
    ...newProps
  } = useThemeProps('Accordion', props);
  const [index, setIndex] = React.useState(pIndex || defaultIndex || []); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  const changeHandler = (isOpening, activeIndex) => {
    let indexCopy = index.map(i => i);

    if (allowToggle) {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        setIndex(index.splice(index.indexOf(activeIndex), 1));
      }
    } else {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        indexCopy = indexCopy.filter(n => n !== activeIndex);
        setIndex(indexCopy);
      }
    }

    onChange && onChange(indexCopy);
  };

  return /*#__PURE__*/React.createElement(AccordionContext.Provider, {
    value: {
      index: index,
      changeHandler,
      AnimationProps: {
        endingHeight,
        startingHeight,
        duration,
        isOpen,
        onAnimationEnd,
        onAnimationStart
      }
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({
    overflow: "hidden"
  }, newProps, {
    ref: ref
  }), getIndexedChildren(children)));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Accordion));
//# sourceMappingURL=Accordion.js.map