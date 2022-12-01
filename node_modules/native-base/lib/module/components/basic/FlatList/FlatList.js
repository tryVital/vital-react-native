function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { FlatList as RNFlatList } from 'react-native';
import { usePropsResolution, useStyledSystemPropsResolver } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const StyledFlatList = makeStyledComponent(RNFlatList);

const FlatListComponent = (props, ref) => {
  const {
    _contentContainerStyle,
    contentContainerStyle,
    ...resolvedProps
  } = usePropsResolution('FlatList', props);
  const resolved_ContentContainerStyle = useStyledSystemPropsResolver(_contentContainerStyle || {}); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(StyledFlatList, _extends({}, resolvedProps, {
    contentContainerStyle: contentContainerStyle || resolved_ContentContainerStyle,
    ref: ref
  }));
};

export const FlatList = /*#__PURE__*/forwardRef(FlatListComponent);
//# sourceMappingURL=FlatList.js.map