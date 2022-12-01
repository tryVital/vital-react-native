"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _stableHash = _interopRequireDefault(require("stable-hash"));

var _Pressable = require("../Pressable");

var _Center = require("../../composites/Center");

var _Box = _interopRequireDefault(require("../Box"));

var _Stack = require("../Stack");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _wrapStringChild = require("../../../utils/wrapStringChild");

var _radio = require("@react-native-aria/radio");

var _RadioGroup = require("./RadioGroup");

var _utils = require("../../../utils");

var _Icons = require("../Icon/Icons");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils2 = require("../../../theme/tools/utils");

var _Pressable2 = require("../../primitives/Pressable/Pressable");

var _FormControl = require("../../composites/FormControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RadioComponent = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(({
  icon,
  inputProps,
  combinedProps,
  size,
  children,
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp
}, ref) => {
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate
  } = combinedProps;
  const {
    hoverProps,
    isHovered
  } = (0, _Pressable2.useHover)();
  const {
    pressableProps,
    isPressed
  } = (0, _Pressable2.useIsPressed)();
  const {
    focusProps,
    isFocused
  } = (0, _Pressable2.useFocus)();
  const {
    disabled: isDisabled,
    checked: isChecked
  } = inputProps;
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    _interactionBox,
    _icon,
    _stack,
    _text,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Radio', { ...combinedProps,
    size
  }, {
    isInvalid,
    isReadOnly,
    isDisabled,
    isIndeterminate,
    isChecked,
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused
  });
  const [, cleanInputProps] = (0, _utils2.extractInObject)(inputProps, [..._utils2.stylingProps.margin, ..._utils2.stylingProps.layout, ..._utils2.stylingProps.flexbox, ..._utils2.stylingProps.position, ..._utils2.stylingProps.background, ..._utils2.stylingProps.padding, ..._utils2.stylingProps.border, '_text']); // only calling below function when icon exist.

  const sizedIcon = () =>
  /*#__PURE__*/
  //@ts-ignore
  _react.default.cloneElement(icon, { ..._icon
  });

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    disabled: isDisabled
  }, pressableProps, cleanInputProps, {
    ref: (0, _utils.mergeRefs)([ref, wrapperRef]),
    accessibilityRole: "radio",
    onPressIn: (0, _utils.composeEventHandlers)(onPressIn, pressableProps.onPressIn),
    onPressOut: (0, _utils.composeEventHandlers)(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: (0, _utils.composeEventHandlers)(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: (0, _utils.composeEventHandlers)(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onFocus, focusProps.onFocus) // focusRingProps.onFocu
    ) // @ts-ignore - web only
    ,
    onBlur: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onBlur, focusProps.onBlur) // focusRingProps.onBlur
    )
  }), /*#__PURE__*/_react.default.createElement(_Stack.Stack, _stack, /*#__PURE__*/_react.default.createElement(_Center.Center, null, /*#__PURE__*/_react.default.createElement(_Box.default, _interactionBox), /*#__PURE__*/_react.default.createElement(_Center.Center, resolvedProps, icon && sizedIcon && isChecked ? sizedIcon() : /*#__PURE__*/_react.default.createElement(_Icons.CircleIcon, _extends({}, _icon, {
    opacity: isChecked ? 1 : 0
  })))), (0, _wrapStringChild.wrapStringChild)(children, _text)));
}));

const Radio = ({
  icon,
  children,
  size,
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  ...props
}, ref) => {
  var _contextState$state;

  const formControlContext = (0, _FormControl.useFormControlContext)();

  const contextState = _react.default.useContext(_RadioGroup.RadioContext);

  const combinedProps = (0, _utils.combineContextAndProps)({ ...formControlContext,
    ...contextState
  }, props);

  const inputRef = _react.default.useRef(null);

  const radioState = (0, _radio.useRadio)({ ...combinedProps,
    'aria-label': props.accessibilityLabel,
    children
  }, (_contextState$state = contextState.state) !== null && _contextState$state !== void 0 ? _contextState$state : {}, inputRef); // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = _react.default.useMemo(() => radioState.inputProps, [radioState.inputProps.checked, radioState.inputProps.disabled]);

  const contextCombinedProps = _react.default.useMemo(() => {
    return { ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(0, _stableHash.default)(combinedProps)]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if ((0, _utils.isEmptyObj)(contextState)) {
    console.error('Error: Radio must be wrapped inside a Radio.Group');
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  return /*#__PURE__*/_react.default.createElement(RadioComponent, {
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    children: children,
    size: size,
    ref: ref,
    icon: icon,
    wrapperRef: wrapperRef,
    isHovered: isHoveredProp,
    isPressed: isPressedProp,
    isFocused: isFocusedProp
  });
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Radio));

exports.default = _default;
//# sourceMappingURL=Radio.js.map