function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Animated, Platform } from 'react-native';
import { usePropsResolution } from '../../../hooks';
import { canUseDom } from '../../../utils';
import Box from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useToken } from '../../../hooks/useToken';

const Skeleton = (props, ref) => {
  const isDomUsable = canUseDom();
  const {
    children,
    startColor,
    endColor,
    ...resolvedProps
  } = usePropsResolution('Skeleton', props); // Setting blink Animation

  const blinkAnim = React.useRef(new Animated.Value(0)).current;
  const tokenisedStartColor = useToken('colors', startColor); // Generating blink animation in a sequence

  React.useEffect(() => {
    //Check if window is loaded
    if (isDomUsable) {
      const blink = Animated.sequence([Animated.timing(blinkAnim, {
        toValue: 1,
        duration: resolvedProps.fadeDuration * 10000 * (1 / resolvedProps.speed),
        useNativeDriver: Platform.OS !== 'web'
      }), Animated.timing(blinkAnim, {
        toValue: 0,
        duration: resolvedProps.fadeDuration * 10000 * (1 / resolvedProps.speed),
        useNativeDriver: Platform.OS !== 'web'
      })]);
      Animated.loop(blink).start();
    }
  }, [blinkAnim, isDomUsable, resolvedProps]);
  const skeletonStyle = {
    skeleton: {
      height: '100%',
      width: '100%',
      backgroundColor: tokenisedStartColor,
      opacity: blinkAnim // Bind opacity to animated value

    }
  }; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return resolvedProps.isLoaded ? children : /*#__PURE__*/React.createElement(Box, _extends({
    bg: endColor
  }, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: skeletonStyle.skeleton
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Skeleton));
//# sourceMappingURL=Skeleton.js.map