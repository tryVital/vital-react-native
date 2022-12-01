"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popper = void 0;

var _react = _interopRequireDefault(require("react"));

var _overlays = require("@react-native-aria/overlays");

var _reactNative = require("react-native");

var _utils = require("../../../utils");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const defaultArrowHeight = 15;
const defaultArrowWidth = 15;

const getDiagonalLength = (height, width) => {
  return Math.pow(height * height + width * width, 0.5);
};

const [PopperProvider, usePopperContext] = (0, _utils.createContext)('PopperContext');

const Popper = props => {
  return /*#__PURE__*/_react.default.createElement(PopperProvider, props, props.children);
};

exports.Popper = Popper;

const PopperContent = /*#__PURE__*/_react.default.forwardRef(({
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

  const overlayRef = _react.default.useRef(null); // const { top } = useSafeAreaInsets();


  const {
    overlayProps,
    rendered,
    arrowProps,
    placement
  } = (0, _overlays.useOverlayPosition)({
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

  _react.default.useEffect(() => {
    setOverlayRef && setOverlayRef(overlayRef);
  }, [overlayRef, setOverlayRef]); // Might have performance impact if there are a lot of siblings!
  // Shouldn't be an issue with popovers since it would have atmost 2. Arrow and Content.


  _react.default.Children.forEach(children, child => {
    if ( /*#__PURE__*/_react.default.isValidElement(child) && // @ts-ignore
    child.type.displayName === 'PopperArrow') {
      arrowElement = /*#__PURE__*/_react.default.cloneElement(child, {
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

  const containerStyle = _react.default.useMemo(() => getContainerStyle({
    placement,
    arrowHeight,
    arrowWidth
  }), [arrowHeight, arrowWidth, placement]);

  const overlayStyle = _react.default.useMemo(() => _reactNative.StyleSheet.create({
    overlay: { ...overlayProps.style,
      // To handle translucent android StatusBar
      // marginTop: Platform.select({ android: top, default: 0 }),
      opacity: rendered ? 1 : 0,
      position: 'absolute'
    }
  }), [rendered, overlayProps.style]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(rest)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    ref: overlayRef,
    collapsable: false,
    style: overlayStyle.overlay
  }, arrowElement, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    style: _reactNative.StyleSheet.flatten([containerStyle, style])
  }, rest, {
    ref: ref
  }), restElements));
}); // This is an internal implementation of PopoverArrow


const PopperArrow = /*#__PURE__*/_react.default.forwardRef(({
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
  const additionalStyles = _react.default.useMemo(() => getArrowStyles({
    placement: actualPlacement,
    height,
    width
  }), [actualPlacement, height, width]);

  const triangleStyle = _react.default.useMemo(() => ({
    position: 'absolute',
    width,
    height
  }), [width, height]);

  const arrowStyles = _react.default.useMemo(() => [arrowProps.style, triangleStyle, additionalStyles, style], [triangleStyle, additionalStyles, arrowProps.style, style]);

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
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
//# sourceMappingURL=Popper.js.map