function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { ExitAnimationContext } from '../../primitives/Overlay/ExitAnimationContext';
import { Transition } from './Transition';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const PresenceTransition = ({
  visible = false,
  onTransitionComplete,
  ...rest
}, ref) => {
  // const [animationExited, setAnimationExited] = React.useState(!visible);
  const {
    setExited
  } = React.useContext(ExitAnimationContext); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(rest)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Transition, _extends({
    visible: visible,
    onTransitionComplete: state => {
      if (state === 'exited') {
        setExited(true);
      } else {
        setExited(false);
      }

      onTransitionComplete && onTransitionComplete(state);
    }
  }, rest, {
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(PresenceTransition));
//# sourceMappingURL=PresenceTransition.js.map