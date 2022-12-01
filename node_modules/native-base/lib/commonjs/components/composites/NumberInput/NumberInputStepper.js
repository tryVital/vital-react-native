"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NBStepper = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _primitives = require("../../primitives");

var _hooks = require("../../../hooks");

var _Context = require("./Context");

var _Icons = require("../../primitives/Icon/Icons");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const NBStepper = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    style,
    isIncrement,
    disablitityCheck,
    _active,
    _disabled,
    isDisabled,
    accessibilityLabel,
    pressHandler,
    iconColor,
    ...newProps
  } = (0, _hooks.useThemeProps)('NumberInputStepper', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 0.2,
    disabled: disablitityCheck || isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({}, newProps, _active, disablitityCheck || isDisabled ? _disabled : {}, {
    borderColor: "transparent",
    style: style,
    opacity: disablitityCheck || isDisabled ? 0.4 : 1
  }, _reactNative.Platform.OS === 'web' ? {
    disabled: disablitityCheck || isDisabled,
    cursor: disablitityCheck || isDisabled ? 'not-allowed' : 'auto'
  } : {}), children || isIncrement ? /*#__PURE__*/_react.default.createElement(_Icons.ChevronUpIcon, {
    color: iconColor
  }) : /*#__PURE__*/_react.default.createElement(_Icons.ChevronDownIcon, {
    color: iconColor
  })));
});

exports.NBStepper = NBStepper;

const NumberInputStepper = ({
  children,
  ...props
}, ref) => {
  const {
    //@ts-ignore
    numberInputStepper,
    setNumberInputStepper
  } = _react.default.useContext(_Context.NumberInputContext);

  _react.default.useEffect(() => {
    !numberInputStepper && setNumberInputStepper( /*#__PURE__*/_react.default.createElement(_primitives.VStack, _extends({}, props, {
      ref: ref
    }), children));
  }, [numberInputStepper, setNumberInputStepper, props, children, ref]);

  return null;
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(NumberInputStepper));

exports.default = _default;
//# sourceMappingURL=NumberInputStepper.js.map