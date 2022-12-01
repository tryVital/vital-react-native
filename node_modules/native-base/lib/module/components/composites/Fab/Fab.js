function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Button } from '../../primitives/Button';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { OverlayContainer } from '@react-native-aria/overlays';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { extractInObject } from '../../../theme/tools/utils';

const Fab = ({ ...props
}, ref) => {
  /** Extracting Button Specific Props */
  const [buttonProps, remainingProps] = extractInObject(props, ['variant', '_pressed', '_hover', '_text', '_focus', '_stack', '_loading', '_disabled', '_spinner']);
  const themeProps = usePropsResolution('FAB', remainingProps);
  const {
    label,
    icon,
    renderInPortal,
    placement,
    placementProps,
    ...newProps
  } = themeProps;
  const fabComponent = /*#__PURE__*/React.createElement(Button, _extends({}, buttonProps, placementProps[placement], {
    ref: ref,
    startIcon: icon
  }, newProps), label); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return renderInPortal ? /*#__PURE__*/React.createElement(OverlayContainer, null, fabComponent) : fabComponent;
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Fab));
//# sourceMappingURL=Fab.js.map