"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isnil"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _primitives = require("../../primitives");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function usePrevious(value) {
  const ref = (0, _react.useRef)();

  function updatePrevious(newVal) {
    ref.current = newVal;
  }

  (0, _react.useEffect)(() => {
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
  if (_reactNative.Platform.OS === 'android') {
    _reactNative.UIManager.setLayoutAnimationEnabledExperimental && _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const CustomLayoutLinear = {
    duration: duration ? duration : 400,
    create: {
      type: _reactNative.LayoutAnimation.Types.easeInEaseOut,
      property: _reactNative.LayoutAnimation.Properties.opacity
    },
    update: {
      type: _reactNative.LayoutAnimation.Types.easeInEaseOut
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

    _reactNative.LayoutAnimation.configureNext(CustomLayoutLinear, callback());
  };

  let wasOpen = usePrevious(isOpen);

  if (!(0, _lodash.default)(wasOpen.value) && wasOpen.value !== isOpen) {
    animateView();
    wasOpen.updatePrevious(isOpen);
  }

  const [size, setSize] = _react.default.useState(startingHeight !== null && startingHeight !== void 0 ? startingHeight : 0);

  const provideSize = layoutSize => {
    setSize(layoutSize.height);
  };

  const _web = {
    transition: "height ".concat(duration !== null && duration !== void 0 ? duration : '400', "ms"),
    height: isOpen ? endingHeight || size : startingHeight || 0
  }; //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_primitives.Box, {
    style: { ...animatedStyle,
      ...(_reactNative.Platform.OS === 'web' && _web)
    },
    overflow: "hidden",
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_primitives.Box //@ts-ignore
  , _extends({
    overflow: _reactNative.Platform.OS === 'web' ? 'auto' : 'scroll',
    onLayout: e => provideSize(e.nativeEvent.layout)
  }, props)));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/(0, _react.forwardRef)(Collapse));

exports.default = _default;
//# sourceMappingURL=index.js.map