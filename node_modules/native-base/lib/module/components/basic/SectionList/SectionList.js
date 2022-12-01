function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { SectionList as RNSectionList } from 'react-native';
import { usePropsResolution } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const StyledSectionList = makeStyledComponent(RNSectionList);

const SectionListComponent = (props, ref) => {
  const { ...resolvedProps
  } = usePropsResolution('SectionList', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(StyledSectionList, _extends({}, resolvedProps, {
    ref: ref
  }));
};

export const SectionList = /*#__PURE__*/forwardRef(SectionListComponent);
//# sourceMappingURL=SectionList.js.map