function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Box } from '../../primitives';
import { WarningIcon, WarningTwoIcon, InfoIcon, CheckCircleIcon } from '../../primitives/Icon/Icons';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { AlertContext } from './Context';
import { omitUndefined } from '../../../theme/tools/utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AlertIcon = ({
  children,
  ...props
}, ref) => {
  let newProps = usePropsResolution('AlertIcon', props);
  newProps = omitUndefined(newProps);
  const {
    status,
    _icon
  } = React.useContext(AlertContext);

  const getIcon = () => {
    switch (status) {
      case 'error':
        return /*#__PURE__*/React.createElement(WarningTwoIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      case 'warning':
        return /*#__PURE__*/React.createElement(WarningIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      case 'success':
        return /*#__PURE__*/React.createElement(CheckCircleIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      default:
        return /*#__PURE__*/React.createElement(InfoIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));
    }
  }; //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, null, children || getIcon());
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(AlertIcon));
//# sourceMappingURL=AlertIcon.js.map