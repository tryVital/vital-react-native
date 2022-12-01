function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { usePropsResolution } from '../../../hooks';
import { Stack } from '../../primitives/Stack';
import Skeleton from './Skeleton';

const SkeletonText = (props, ref) => {
  // const { children, ...props } = allProps;
  const {
    children,
    startColor,
    endColor,
    lines,
    isLoaded,
    _line,
    ...resolvedProps
  } = usePropsResolution('SkeletonText', props);
  const computedChildren = []; //generating an array of skeleton components (same length as noOfLines)

  for (let i = 0; i < lines; i++) {
    //check for last line (to change the width of last line)
    if (i === lines - 1 && lines !== 1) {
      computedChildren.push(
      /*#__PURE__*/
      //Using Skeleton component with required props
      React.createElement(Skeleton, _extends({
        key: i,
        endColor: endColor,
        startColor: startColor,
        w: "75%"
      }, _line)));
    } else computedChildren.push( /*#__PURE__*/React.createElement(Skeleton, _extends({
      key: i,
      endColor: endColor,
      startColor: startColor
    }, _line)));
  }

  return isLoaded ? children : /*#__PURE__*/React.createElement(Stack, _extends({}, resolvedProps, {
    ref: ref
  }), computedChildren);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(SkeletonText));
//# sourceMappingURL=SkeletonText.js.map