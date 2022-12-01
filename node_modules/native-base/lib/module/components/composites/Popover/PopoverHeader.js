function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef, useEffect, useContext } from 'react';
import { usePropsResolution } from '../../../hooks';
import { default as Box } from '../../primitives/Box';
import { PopoverContext } from './PopoverContext';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const PopoverHeader = (props, ref) => {
  const resolvedProps = usePropsResolution('PopoverHeader', props);
  const {
    setHeaderMounted,
    headerId
  } = useContext(PopoverContext);
  useEffect(() => {
    setHeaderMounted(true);
    return () => {
      setHeaderMounted(false);
    };
  }, [setHeaderMounted]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    nativeID: headerId
  }, resolvedProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(PopoverHeader));
//# sourceMappingURL=PopoverHeader.js.map