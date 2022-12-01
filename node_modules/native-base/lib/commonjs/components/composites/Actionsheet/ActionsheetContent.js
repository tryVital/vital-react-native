"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Modal = require("../../composites/Modal");

var _hooks = require("../../../hooks");

var _reactNative = require("react-native");

var _Context = require("../Modal/Context");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _ActionSheetContext = require("./ActionSheetContext");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Content = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(({
  hideDragIndicator,
  children,
  handleClose,
  pan,
  sheetHeight,
  ...props
}, ref) => {
  const {
    _dragIndicator,
    _dragIndicatorWrapperOffSet,
    _dragIndicatorWrapper,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('ActionsheetContent', props);

  const handleCloseRef = _react.default.useRef(null);

  const handleCloseCallback = _react.default.useCallback(() => {
    let handleCloseCurrent = handleCloseRef.current; //@ts-ignore

    return handleCloseCurrent();
  }, []);

  _react.default.useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  const panResponder = _react.default.useRef(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_evt, gestureState) => {
      return gestureState.dy > 15;
    },
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        _reactNative.Animated.event([null, {
          dy: pan.y
        }], {
          useNativeDriver: false
        })(e, gestureState);
      }
    },
    onPanResponderRelease: (_e, gestureState) => {
      // If sheet is dragged 1/4th of it's height, close it
      if (sheetHeight.current / 4 - gestureState.dy < 0) {
        _reactNative.Animated.timing(pan, {
          toValue: {
            x: 0,
            y: sheetHeight.current
          },
          duration: 150,
          useNativeDriver: true
        }).start(handleCloseCallback);

        setTimeout(() => {
          _reactNative.Animated.timing(pan, {
            toValue: {
              x: 0,
              y: 0
            },
            duration: 150,
            useNativeDriver: true
          }).start();
        }, 300);
      } else {
        _reactNative.Animated.spring(pan, {
          toValue: {
            x: 0,
            y: 0
          },
          overshootClamping: true,
          useNativeDriver: true
        }).start();
      }
    }
  })).current;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hideDragIndicator ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, panResponder.panHandlers, _dragIndicatorWrapperOffSet))) : null, /*#__PURE__*/_react.default.createElement(_Modal.Modal.Content, _extends({}, resolvedProps, {
    ref: ref,
    safeAreaBottom: true
  }), !hideDragIndicator ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, panResponder.panHandlers, _dragIndicatorWrapper), /*#__PURE__*/_react.default.createElement(_Box.default, _dragIndicator))) : null, children));
}));

const ActionsheetContent = ({
  children,
  ...props
}, ref) => {
  // return null;
  const {
    handleClose
  } = _react.default.useContext(_Context.ModalContext);

  const {
    hideDragIndicator
  } = _react.default.useContext(_ActionSheetContext.ActionSheetContext);

  const pan = _react.default.useRef(new _reactNative.Animated.ValueXY()).current;

  const sheetHeight = _react.default.useRef(0);

  const handleCloseCallback = _react.default.useCallback(handleClose, [_Context.ModalContext, handleClose]); // useEffect(() => {
  // }, [])
  //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        translateY: pan.y
      }],
      width: '100%'
    },
    onLayout: event => {
      const {
        height
      } = event.nativeEvent.layout;
      sheetHeight.current = height;
    },
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(Content, _extends({
    children: children,
    sheetHeight: sheetHeight,
    pan: pan,
    hideDragIndicator: hideDragIndicator,
    handleClose: handleCloseCallback,
    ref: ref
  }, props)));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(ActionsheetContent));

exports.default = _default;
//# sourceMappingURL=ActionsheetContent.js.map