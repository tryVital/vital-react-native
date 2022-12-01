function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { ScrollView } from '../../basic/ScrollView';

const ModalBody = ({
  children,
  ...props
}, ref) => {
  const {
    _scrollview,
    ...resolvedProps
  } = usePropsResolution('ModalBody', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ScrollView, _scrollview, /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ModalBody));
//# sourceMappingURL=ModalBody.js.map