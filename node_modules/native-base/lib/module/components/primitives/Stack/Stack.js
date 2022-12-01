function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { default as Box } from '../Box';
import { getSpacedChildren } from '../../../utils';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { ResponsiveQueryContext } from '../../../utils/useResponsiveQuery/ResponsiveQueryProvider';

const Stack = ({
  space,
  ...props
}, ref) => {
  const dir = props.direction;
  const {
    children,
    direction,
    reversed,
    divider,
    size,
    ...resolvedProps
  } = usePropsResolution('Stack', { ...props,
    size: space
  }, {
    isDisabled: props.isDisabled,
    isHovered: props.isHovered,
    isFocused: props.isFocused,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly
  }, {
    resolveResponsively: ['space', 'direction']
  });
  const responsiveQueryContext = React.useContext(ResponsiveQueryContext);
  const disableCSSMediaQueries = responsiveQueryContext.disableCSSMediaQueries; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    flexDirection: dir
  }, resolvedProps, {
    ref: ref // @ts-ignore
    ,
    gap: disableCSSMediaQueries ? undefined : size
  }), getSpacedChildren(children, size, direction === 'row' ? 'X' : 'Y', reversed ? 'reverse' : 'normal', divider));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Stack));
//# sourceMappingURL=Stack.js.map