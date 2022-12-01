"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Context = require("./Context");

var _hooks = require("../../../hooks");

var _utils = require("../../../utils");

var _interactions = require("@react-native-aria/interactions");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AccordionSummary = ({
  children,
  ...props
}, ref) => {
  const {
    index,
    isOpen,
    isDisabled,
    onOpen,
    onClose
  } = _react.default.useContext(_Context.AccordionItemContext);

  const {
    _hover,
    _expanded,
    _disabled,
    ...themedProps
  } = (0, _hooks.useThemeProps)('AccordionSummary', props);

  const pressHandler = () => {
    isOpen ? onClose && onClose() : onOpen && onOpen();
  };

  const _ref = _react.default.useRef(null);

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 0.2,
    disabled: isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityRole: "checkbox",
    ref: (0, _utils.mergeRefs)([ref, _ref])
  }, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }, themedProps, isHovered && _hover, isOpen && _expanded, isDisabled && _disabled, !index && {
    borderTopColor: 'transparent'
  }, _reactNative.Platform.OS === 'web' ? {
    disabled: isDisabled,
    cursor: isDisabled ? 'not-allowed' : 'auto'
  } : {}), children));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(AccordionSummary));

exports.default = _default;
//# sourceMappingURL=AccordionSummary.js.map