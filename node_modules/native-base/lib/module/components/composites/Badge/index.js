function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import HStack from '../../primitives/Stack/HStack';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Badge = ({
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  ...props
}, ref) => {
  const {
    _icon,
    _text,
    ...newProps
  } = usePropsResolution('Badge', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (leftIcon) {
    startIcon = leftIcon;
  }

  if (rightIcon) {
    endIcon = rightIcon;
  }

  if (endIcon && /*#__PURE__*/React.isValidElement(endIcon)) {
    endIcon = React.Children.map(endIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "badge-end-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  if (startIcon && /*#__PURE__*/React.isValidElement(startIcon)) {
    startIcon = React.Children.map(startIcon, (child, index) => {
      return /*#__PURE__*/React.cloneElement(child, {
        key: "badge-start-icon-".concat(index),
        ..._icon,
        ...child.props
      });
    });
  }

  return /*#__PURE__*/React.createElement(HStack, _extends({}, newProps, {
    ref: ref
  }), startIcon ? startIcon : null, /*#__PURE__*/React.createElement(Box, {
    _text: _text
  }, children), endIcon ? endIcon : null);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Badge));
//# sourceMappingURL=index.js.map