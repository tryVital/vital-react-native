function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { makeStyledComponent } from '../../../utils/styled';
import { View as RNView } from 'react-native';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useThemeProps } from '../../../hooks/useThemeProps';
import { useSafeArea } from '../../../hooks/useSafeArea';
const StyledView = makeStyledComponent(RNView);

const View = (props, ref) => {
  const viewProps = useThemeProps('View', props);
  const safeAreaProps = useSafeArea(viewProps); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(StyledView, _extends({}, safeAreaProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(View));
//# sourceMappingURL=index.js.map