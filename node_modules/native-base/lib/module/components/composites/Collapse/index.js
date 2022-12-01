function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import isNil from 'lodash.isnil';
import React, { useEffect, useRef, forwardRef } from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import { Box } from '../../primitives';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

function usePrevious(value) {
  const ref = useRef();

  function updatePrevious(newVal) {
    ref.current = newVal;
  }

  useEffect(() => {
    updatePrevious(value);
  }, [value]);
  return {
    value: ref.current,
    updatePrevious
  };
}

const Collapse = ({
  endingHeight,
  startingHeight,
  duration,
  // animateOpacity,
  isOpen,
  onAnimationEnd,
  onAnimationStart,
  ...props
}, ref) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const CustomLayoutLinear = {
    duration: duration ? duration : 400,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  };
  const defaultStartHeight = isOpen ? endingHeight : startingHeight ? startingHeight : 1;
  let animatedStyle = {
    height: defaultStartHeight
  };

  const animateView = () => {
    if (onAnimationStart) {
      onAnimationStart();
    }

    animatedStyle = {
      height: isOpen ? endingHeight : defaultStartHeight
    };
    let callback = onAnimationEnd ? onAnimationEnd : () => {};
    LayoutAnimation.configureNext(CustomLayoutLinear, callback());
  };

  let wasOpen = usePrevious(isOpen);

  if (!isNil(wasOpen.value) && wasOpen.value !== isOpen) {
    animateView();
    wasOpen.updatePrevious(isOpen);
  }

  const [size, setSize] = React.useState(startingHeight !== null && startingHeight !== void 0 ? startingHeight : 0);

  const provideSize = layoutSize => {
    setSize(layoutSize.height);
  };

  const _web = {
    transition: "height ".concat(duration !== null && duration !== void 0 ? duration : '400', "ms"),
    height: isOpen ? endingHeight || size : startingHeight || 0
  }; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, {
    style: { ...animatedStyle,
      ...(Platform.OS === 'web' && _web)
    },
    overflow: "hidden",
    ref: ref
  }, /*#__PURE__*/React.createElement(Box //@ts-ignore
  , _extends({
    overflow: Platform.OS === 'web' ? 'auto' : 'scroll',
    onLayout: e => provideSize(e.nativeEvent.layout)
  }, props)));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef(Collapse));
//# sourceMappingURL=index.js.map