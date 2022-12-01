"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _utils = require("../../../utils");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _useToken = require("../../../hooks/useToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Skeleton = (props, ref) => {
  const isDomUsable = (0, _utils.canUseDom)();
  const {
    children,
    startColor,
    endColor,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Skeleton', props); // Setting blink Animation

  const blinkAnim = _react.default.useRef(new _reactNative.Animated.Value(0)).current;

  const tokenisedStartColor = (0, _useToken.useToken)('colors', startColor); // Generating blink animation in a sequence

  _react.default.useEffect(() => {
    //Check if window is loaded
    if (isDomUsable) {
      const blink = _reactNative.Animated.sequence([_reactNative.Animated.timing(blinkAnim, {
        toValue: 1,
        duration: resolvedProps.fadeDuration * 10000 * (1 / resolvedProps.speed),
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      }), _reactNative.Animated.timing(blinkAnim, {
        toValue: 0,
        duration: resolvedProps.fadeDuration * 10000 * (1 / resolvedProps.speed),
        useNativeDriver: _reactNative.Platform.OS !== 'web'
      })]);

      _reactNative.Animated.loop(blink).start();
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

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return resolvedProps.isLoaded ? children : /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    bg: endColor
  }, resolvedProps, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: skeletonStyle.skeleton
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Skeleton));

exports.default = _default;
//# sourceMappingURL=Skeleton.js.map