function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import PresenceTransition from './PresenceTransition';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const defaultStaggerConfig = {
  offset: 0,
  reverse: false
};

const Stagger = ({
  children,
  ...restProps
}) => {
  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(restProps)) {
    return null;
  }

  return React.Children.map(children, (child, index) => {
    const clonedAnimationConfig = cloneDeep(restProps);
    const {
      animate,
      exit
    } = clonedAnimationConfig;

    if (animate) {
      var _animate$transition$d, _animate$transition$s;

      if (!animate.transition) {
        animate.transition = {};
      }

      animate.transition.delay = (_animate$transition$d = animate.transition.delay) !== null && _animate$transition$d !== void 0 ? _animate$transition$d : 0;
      const stagger = (_animate$transition$s = animate.transition.stagger) !== null && _animate$transition$s !== void 0 ? _animate$transition$s : defaultStaggerConfig;
      const offset = stagger.reverse ? (React.Children.count(children) - 1 - index) * stagger.offset : index * stagger.offset;
      animate.transition.delay = animate.transition.delay + offset;
    }

    if (exit) {
      var _exit$transition$dela, _exit$transition$stag;

      if (!exit.transition) {
        exit.transition = {};
      }

      exit.transition.delay = (_exit$transition$dela = exit.transition.delay) !== null && _exit$transition$dela !== void 0 ? _exit$transition$dela : 0;
      const stagger = (_exit$transition$stag = exit.transition.stagger) !== null && _exit$transition$stag !== void 0 ? _exit$transition$stag : defaultStaggerConfig;
      const offset = stagger.reverse ? (React.Children.count(children) - 1 - index) * stagger.offset : index * stagger.offset;
      exit.transition.delay = exit.transition.delay + offset;
    }

    return /*#__PURE__*/React.createElement(PresenceTransition, _extends({
      key: child.key
    }, clonedAnimationConfig), child);
  });
};

export default Stagger;
//# sourceMappingURL=Stagger.js.map