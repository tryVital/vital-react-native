"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _reactNative = require("react-native");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SlideFade = ({
  children,
  ...props
}, ref) => {
  const isDomUsable = (0, _utils.canUseDom)();
  const {
    in: animationState,
    duration,
    offsetX,
    offsetY
  } = (0, _useThemeProps.useThemeProps)('SlideFade', props);

  const fadeAnim = _react.default.useRef(new _reactNative.Animated.Value(0)).current;

  const slideAnimX = _react.default.useRef(new _reactNative.Animated.Value(0)).current;

  const slideAnimY = _react.default.useRef(new _reactNative.Animated.Value(0)).current;

  const animIn = () => {
    if (isDomUsable) {
      _reactNative.Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();

      _reactNative.Animated.timing(slideAnimX, {
        toValue: 0,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();

      _reactNative.Animated.timing(slideAnimY, {
        toValue: 0,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();
    }
  };

  const animOut = () => {
    if (isDomUsable) {
      _reactNative.Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();

      offsetX && _reactNative.Animated.timing(slideAnimX, {
        toValue: offsetX,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();
      offsetY && _reactNative.Animated.timing(slideAnimY, {
        toValue: offsetY,
        duration: duration,
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }).start();
    }
  };

  animationState ? animIn() : animOut(); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [{
      opacity: fadeAnim,
      transform: [{
        translateX: slideAnimX,
        translateY: slideAnimY
      }]
    }],
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_Box.default, props, children));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(SlideFade));

exports.default = _default;
//# sourceMappingURL=SlideFade.js.map