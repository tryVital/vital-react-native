function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PresenceTransition from './PresenceTransition';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks/';

const ScaleFade = ({
  children,
  ...props
}, ref) => {
  const {
    in: animationState,
    duration,
    initialScale,
    ...resolvedProps
  } = usePropsResolution('ScaleFade', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (duration) {
    resolvedProps.animate.transition.duration = duration;
    resolvedProps.exit.transition.duration = duration;
  }

  if (initialScale) {
    resolvedProps.animate.initial.scale = initialScale;
    resolvedProps.exit.initial.scale = initialScale;
  }

  return /*#__PURE__*/React.createElement(PresenceTransition, _extends({
    visible: animationState
  }, resolvedProps, {
    ref: ref
  }), children);
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(ScaleFade));
//# sourceMappingURL=ScaleFade.js.map