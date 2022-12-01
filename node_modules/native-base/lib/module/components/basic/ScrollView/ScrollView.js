function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { usePropsResolution, useStyledSystemPropsResolver } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const StyledScrollView = makeStyledComponent(RNScrollView);
export const ScrollView = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    _contentContainerStyle,
    contentContainerStyle,
    ...resolvedProps
  } = usePropsResolution('ScrollView', props, {});
  const resolved_ContentContainerStyle = useStyledSystemPropsResolver(_contentContainerStyle || {}); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(StyledScrollView, _extends({}, resolvedProps, {
    contentContainerStyle: contentContainerStyle || resolved_ContentContainerStyle,
    ref: ref
  }));
});
//# sourceMappingURL=ScrollView.js.map