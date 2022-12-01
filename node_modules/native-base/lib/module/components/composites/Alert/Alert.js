function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box'; // import { HStack } from '../../primitives/Stack';

import { usePropsResolution } from '../../../hooks/useThemeProps';
import { AlertContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Alert = ({
  children,
  ...props
}, ref) => {
  const {
    status,
    variant,
    _icon,
    colorScheme,
    ...newProps
  } = usePropsResolution('Alert', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(AlertContext.Provider, {
    value: {
      status,
      variant,
      _icon,
      colorScheme
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({}, newProps, {
    ref: ref
  }), children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Alert));
//# sourceMappingURL=Alert.js.map