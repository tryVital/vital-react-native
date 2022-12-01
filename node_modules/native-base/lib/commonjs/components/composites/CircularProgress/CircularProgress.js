"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styled = require("../../../utils/styled");

var _hooks = require("../../../hooks");

var _utils = require("../../../utils");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _theme = require("../../../theme");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyleAnimatedView = (0, _styled.makeStyledComponent)(_reactNative.Animated.View);

const CircularProgress = ({
  value,
  isIndeterminate,
  max,
  min,
  ...props
}, ref) => {
  const theme = (0, _hooks.useTheme)();
  const isDomUsable = (0, _utils.canUseDom)();

  if (min) {
    value = value - min;
  }

  let sizeProps;
  let newProps = (0, _hooks.useThemeProps)('CircularProgress', props);

  let [, remainingProps] = _theme.themeTools.extractInObject(props, ['size']); // removing size from props so that Box don't accept size passed for CircularProgress


  if (!newProps.size) {
    sizeProps = {
      height: newProps.height,
      width: newProps.width
    };
  } else {
    sizeProps = {
      height: newProps.size,
      width: newProps.size
    };
  } // fetching size from theme for passing into style prop


  const themeHeight = (0, _lodash.default)(theme, 'space.' + sizeProps.height);
  const themeWidth = (0, _lodash.default)(theme, 'space.' + sizeProps.width);
  const styleSize = {
    height: themeHeight ? parseInt(themeHeight.slice(themeHeight.Length, -2), 10) : sizeProps.height,
    width: themeWidth ? parseInt(themeWidth.slice(themeWidth.Length, -2), 10) : sizeProps.width
  };
  const defaultThickness = newProps.thickness;
  const degree = new _reactNative.Animated.Value(0);

  if (isIndeterminate) {
    if (isDomUsable) {
      _reactNative.Animated.loop(_reactNative.Animated.timing(degree, {
        toValue: 1,
        duration: 600,
        easing: _reactNative.Easing.linear,
        useNativeDriver: false
      })).start();
    }
  }

  const [viewHeight, setViewHeight] = _react.default.useState(0);

  const layout = e => {
    let height = e.nativeEvent.layout.height;
    setViewHeight(height);
  };

  const defaultStyling = {
    borderBottomLeftRadius: viewHeight / 2,
    borderBottomRightRadius: viewHeight / 2,
    borderTopLeftRadius: viewHeight / 2,
    borderTopRightRadius: viewHeight / 2,
    borderLeftWidth: defaultThickness,
    borderBottomWidth: defaultThickness,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    ...styleSize
  };

  const styles = _reactNative.StyleSheet.create({
    firstProgressLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [{
        rotateZ: '-135deg'
      }]
    },
    secondProgressLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [{
        rotateZ: '45deg'
      }]
    },
    offsetLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      borderRadius: viewHeight / 2,
      transform: [{
        rotateZ: '-135deg'
      }]
    },
    animateStyle: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [{
        rotateZ: degree.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }
  });

  let halfSide = (max ? min ? max - min : max : 100) / 2; // calculating the halfvalue of the progress according to min and max

  const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + percent * 180 / halfSide;
    return {
      transform: [{
        rotateZ: rotateBy + 'deg'
      }]
    };
  };

  const renderThirdLayer = percent => {
    if (percent > halfSide) {
      return /*#__PURE__*/_react.default.createElement(_Box.default, {
        borderTopColor: newProps.color,
        borderRightColor: newProps.color,
        style: [styles.secondProgressLayer, propStyle(percent - halfSide, 45)]
      });
    } else {
      return /*#__PURE__*/_react.default.createElement(_Box.default, {
        borderTopColor: newProps.trackColor,
        borderRightColor: newProps.trackColor,
        style: styles.offsetLayer
      });
    }
  };

  let firstProgressLayerStyle;

  if (value > halfSide) {
    firstProgressLayerStyle = propStyle(halfSide, -135);
  } else {
    firstProgressLayerStyle = propStyle(value, -135);
  } //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, sizeProps, {
    rounded: viewHeight / 2,
    borderWidth: defaultThickness,
    borderColor: newProps.trackColor,
    justifyContent: "center",
    alignItems: "center"
  }, remainingProps, {
    ref: ref,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityValue: {
      min,
      max,
      now: value
    }
  }), !isIndeterminate ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    onLayout: layout,
    borderTopColor: newProps.color,
    borderRightColor: newProps.color,
    style: [styles.firstProgressLayer, firstProgressLayerStyle]
  }), renderThirdLayer(value), /*#__PURE__*/_react.default.createElement(_Box.default, {
    _text: newProps._text
  }, remainingProps.children)) : /*#__PURE__*/_react.default.createElement(StyleAnimatedView, {
    onLayout: layout,
    borderTopColor: newProps.color,
    borderRightColor: newProps.color,
    style: styles.animateStyle
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(CircularProgress));

exports.default = _default;
//# sourceMappingURL=CircularProgress.js.map