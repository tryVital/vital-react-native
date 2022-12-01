function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks';
import { ModalContext } from './Context';
import { Platform } from 'react-native';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ModalContent = (props, ref) => {
  const resolvedProps = usePropsResolution('ModalContent', props);
  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose,
    visible
  } = React.useContext(ModalContext);
  React.useEffect(() => {
    const finalRefVal = finalFocusRef ? finalFocusRef.current : null;

    if (visible) {
      if (initialFocusRef && initialFocusRef.current) {
        //@ts-ignore
        initialFocusRef.current.focus();
      }
    } else {
      if (finalRefVal) {
        //@ts-ignore
        finalRefVal.focus();
      }
    }
  }, [initialFocusRef, finalFocusRef, visible]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, contentSize, resolvedProps, {
    ref: ref,
    onAccessibilityEscape: handleClose //@ts-ignore - web only
    ,
    "aria-modal": "true" //@ts-ignore - web only
    ,
    accessibilityRole: Platform.OS === 'web' ? 'dialog' : undefined,
    accessibilityViewIsModal: true,
    _web: {
      focusable: false
    }
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ModalContent));
//# sourceMappingURL=ModalContent.js.map