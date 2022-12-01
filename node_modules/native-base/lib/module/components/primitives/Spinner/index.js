import React, { memo, forwardRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { usePropsResolution, useStyledSystemPropsResolver } from '../../../hooks';
import { getColor } from '../../../theme';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useTheme } from '../../../hooks';

const Spinner = (props, ref) => {
  const {
    color,
    size,
    style,
    testID,
    ...resolvedProps
  } = usePropsResolution('Spinner', props);
  const resolvedColor = getColor(color, useTheme().colors, useTheme());
  const resolvedStyle = useStyledSystemPropsResolver(resolvedProps); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ActivityIndicator, {
    testID: testID,
    accessible: true,
    accessibilityLabel: "loading",
    color: resolvedColor,
    ref: ref,
    size: size,
    style: [resolvedStyle, style]
  });
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Spinner));
//# sourceMappingURL=index.js.map