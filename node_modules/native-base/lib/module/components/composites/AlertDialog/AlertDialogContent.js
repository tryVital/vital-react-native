function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks';
import { AlertDialogContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AlertDialogContent = (props, ref) => {
  const newProps = usePropsResolution('AlertDialogContent', props);
  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose
  } = React.useContext(AlertDialogContext);
  React.useEffect(() => {
    const finalRefVal = finalFocusRef ? finalFocusRef.current : null;

    if (initialFocusRef && initialFocusRef.current) {
      //@ts-ignore
      initialFocusRef.current.focus();
    }

    return () => {
      if (finalRefVal) {
        //@ts-ignore
        finalRefVal.focus();
      }
    };
  }, [initialFocusRef, finalFocusRef]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, contentSize, newProps, {
    ref: ref,
    onAccessibilityEscape: handleClose //@ts-ignore - web only
    ,
    "aria-modal": "true" //@ts-ignore - web only
    ,
    accessibilityRole: "alert",
    accessibilityViewIsModal: true
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(AlertDialogContent));
//# sourceMappingURL=AlertDialogContent.js.map