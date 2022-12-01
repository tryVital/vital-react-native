function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { OverlayContainer } from '@react-native-aria/overlays';
import React from 'react';
import Backdrop from '../Backdrop';
import Box from '../../primitives/Box';

const Drawer = ({
  children,
  isOpen,
  onClose,
  placement = 'right'
}) => {
  const placementStyles = React.useMemo(() => {
    const styles = {
      position: 'absolute'
    };

    if (placement === 'top') {
      styles.top = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = '100%';
    } else if (placement === 'bottom') {
      styles.bottom = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = '100%';
    } else if (placement === 'right') {
      styles.right = 0;
      styles.top = 0;
      styles.bottom = 0;
      styles.height = '100%';
    } else {
      styles.top = 0;
      styles.bottom = 0;
      styles.left = 0;
      styles.height = '100%';
    }

    return styles;
  }, [placement]);
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement(OverlayContainer, null, /*#__PURE__*/React.createElement(Backdrop, {
    onPress: onClose ? onClose : () => {}
  }), /*#__PURE__*/React.createElement(Box, _extends({}, placementStyles, {
    opacity: 1
  }), children));
};

export default Drawer;
//# sourceMappingURL=index.js.map