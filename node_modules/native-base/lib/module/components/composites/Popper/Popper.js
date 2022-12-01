function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { StyleSheet, View } from 'react-native';
import { createContext } from '../../../utils';
import Box from '../../primitives/Box'; // import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const defaultArrowHeight = 15;
const defaultArrowWidth = 15;

const getDiagonalLength = (height, width) => {
  return Math.pow(height * height + width * width, 0.5);
};

const [PopperProvider, usePopperContext] = createContext('PopperContext');

const Popper = props => {
  return /*#__PURE__*/React.createElement(PopperProvider, props, props.children);
};

const PopperContent = /*#__PURE__*/React.forwardRef(({
  children,
  style,
  ...rest
}, ref) => {
  const {
    triggerRef,
    shouldFlip,
    crossOffset,
    offset,
    placement: placementProp,
    onClose,
    shouldOverlapWithTrigger,
    setOverlayRef
  } = usePopperContext('PopperContent');
  const overlayRef = React.useRef(null); // const { top } = useSafeAreaInsets();

  const {
    overlayProps,
    rendered,
    arrowProps,
    placement
  } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    shouldFlip: shouldFlip,
    crossOffset: crossOffset,
    isOpen: rest.isOpen,
    offset: offset,
    placement: placementProp,
    containerPadding: 0,
    onClose: onClose,
    shouldOverlapWithTrigger
  });
  const restElements = [];
  let arrowElement = null;
  React.useEffect(() => {
    setOverlayRef && setOverlayRef(overlayRef);
  }, [overlayRef, setOverlayRef]); // Might have performance impact if there are a lot of siblings!
  // Shouldn't be an issue with popovers since it would have atmost 2. Arrow and Content.

  React.Children.forEach(children, child => {
    if ( /*#__PURE__*/React.isValidElement(child) && // @ts-ignore
    child.type.displayName === 'PopperArrow') {
      arrowElement = /*#__PURE__*/React.cloneElement(child, {
        // @ts-ignore
        arrowProps,
        actualPlacement: placement
      });
    } else {
      restElements.push(child);
    }
  });
  let arrowHeight = 0;
  let arrowWidth = 0;

  if (arrowElement) {
    arrowHeight = defaultArrowHeight;
    arrowWidth = defaultArrowWidth; //@ts-ignore

    if (arrowElement.props.height) {
      //@ts-ignore
      arrowHeight = arrowElement.props.height;
    } //@ts-ignore


    if (arrowElement.props.width) {
      //@ts-ignore
      arrowWidth = arrowElement.props.width;
    }
  }

  const containerStyle = React.useMemo(() => getContainerStyle({
    placement,
    arrowHeight,
    arrowWidth
  }), [arrowHeight, arrowWidth, placement]);
  const overlayStyle = React.useMemo(() => StyleSheet.create({
    overlay: { ...overlayProps.style,
      // To handle translucent android StatusBar
      // marginTop: Platform.select({ android: top, default: 0 }),
      opacity: rendered ? 1 : 0,
      position: 'absolute'
    }
  }), [rendered, overlayProps.style]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(rest)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(View, {
    ref: overlayRef,
    collapsable: false,
    style: overlayStyle.overlay
  }, arrowElement, /*#__PURE__*/React.createElement(Box, _extends({
    style: StyleSheet.flatten([containerStyle, style])
  }, rest, {
    ref: ref
  }), restElements));
}); // This is an internal implementation of PopoverArrow

const PopperArrow = /*#__PURE__*/React.forwardRef(({
  height = defaultArrowHeight,
  width = defaultArrowWidth,
  //@ts-ignore - Will be passed by React.cloneElement from PopperContent
  arrowProps,
  //@ts-ignore - Will be passed by React.cloneElement from PopperContent
  actualPlacement,
  style,
  borderColor = '#52525b',
  backgroundColor = 'black',
  ...rest
}, ref) => {
  const additionalStyles = React.useMemo(() => getArrowStyles({
    placement: actualPlacement,
    height,
    width
  }), [actualPlacement, height, width]);
  const triangleStyle = React.useMemo(() => ({
    position: 'absolute',
    width,
    height
  }), [width, height]);
  const arrowStyles = React.useMemo(() => [arrowProps.style, triangleStyle, additionalStyles, style], [triangleStyle, additionalStyles, arrowProps.style, style]);
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    style: arrowStyles,
    borderColor: borderColor,
    backgroundColor: backgroundColor,
    zIndex: 1
  }, rest));
});

const getArrowStyles = props => {
  const additionalStyles = {
    transform: []
  };
  const diagonalLength = getDiagonalLength(defaultArrowHeight, defaultArrowHeight);

  if (props.placement === 'top' && props.width) {
    additionalStyles.transform.push({
      translateX: -props.width / 2
    });
    additionalStyles.transform.push({
      rotate: '45deg'
    });
    additionalStyles.bottom = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }

  if (props.placement === 'bottom' && props.width) {
    additionalStyles.transform.push({
      translateX: -props.width / 2
    });
    additionalStyles.transform.push({
      rotate: '45deg'
    });
    additionalStyles.top = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }

  if (props.placement === 'left' && props.height) {
    additionalStyles.transform.push({
      translateY: -props.height / 2
    });
    additionalStyles.transform.push({
      rotate: '45deg'
    });
    additionalStyles.right = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }

  if (props.placement === 'right' && props.height) {
    additionalStyles.transform.push({
      translateY: -props.height / 2
    });
    additionalStyles.transform.push({
      rotate: '45deg'
    });
    additionalStyles.left = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }

  return additionalStyles;
};

const getContainerStyle = ({
  placement,
  arrowHeight
}) => {
  const diagonalLength = getDiagonalLength(arrowHeight, arrowHeight) / 2;

  if (placement === 'top') {
    return {
      marginBottom: diagonalLength
    };
  }

  if (placement === 'bottom') {
    return {
      marginTop: diagonalLength
    };
  }

  if (placement === 'left') {
    return {
      marginRight: diagonalLength
    };
  }

  if (placement === 'right') {
    return {
      marginLeft: diagonalLength
    };
  }

  return {};
};

PopperArrow.displayName = 'PopperArrow';
Popper.Content = PopperContent;
Popper.Arrow = PopperArrow;
export { Popper };
//# sourceMappingURL=Popper.js.map