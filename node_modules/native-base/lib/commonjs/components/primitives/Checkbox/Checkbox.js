"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _stableHash = _interopRequireDefault(require("stable-hash"));

var _Pressable = require("../Pressable");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Center = require("../../composites/Center");

var _FormControl = require("../../composites/FormControl");

var _Box = _interopRequireDefault(require("../Box"));

var _utils = require("./../../../utils");

var _toggle = require("@react-stately/toggle");

var _CheckboxGroup = require("./CheckboxGroup");

var _checkbox = require("@react-native-aria/checkbox");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils2 = require("../../../utils");

var _utils3 = require("../../../theme/tools/utils");

var _Pressable2 = require("../../primitives/Pressable/Pressable");

var _SizedIcon = _interopRequireDefault(require("./SizedIcon"));

var _Stack = require("../Stack");

var _wrapStringChild = require("../../../utils/wrapStringChild");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Checkbox = ({
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  ...props
}, ref) => {
  const formControlContext = (0, _FormControl.useFormControlContext)();
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    ...combinedProps
  } = (0, _utils2.combineContextAndProps)(formControlContext, props);
  const checkboxGroupContext = (0, _react.useContext)(_CheckboxGroup.CheckboxGroupContext);
  const state = (0, _toggle.useToggleState)({ ...combinedProps,
    defaultSelected: combinedProps.defaultIsChecked,
    isSelected: combinedProps.isChecked
  });

  const _ref = _react.default.useRef();

  const mergedRef = (0, _utils.mergeRefs)([ref, _ref]); // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.

  const {
    inputProps: groupItemInputProps
  } = checkboxGroupContext ? // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _checkbox.useCheckboxGroupItem)(combinedProps, checkboxGroupContext.state, //@ts-ignore
  mergedRef) : // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _checkbox.useCheckbox)(combinedProps, state, //@ts-ignore
  mergedRef); // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = _react.default.useMemo(() => groupItemInputProps, [groupItemInputProps.checked, groupItemInputProps.disabled]);

  const contextCombinedProps = _react.default.useMemo(() => {
    return { ...checkboxGroupContext,
      ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(0, _stableHash.default)(combinedProps)]);

  return /*#__PURE__*/_react.default.createElement(CheckboxComponent, {
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly,
    isIndeterminate: isIndeterminate,
    isHovered: isHoveredProp,
    isPressed: isPressedProp,
    isFocused: isFocusedProp,
    wrapperRef: wrapperRef
  });
};

const CheckboxComponent = /*#__PURE__*/_react.default.memo(({
  wrapperRef,
  inputProps,
  combinedProps,
  isInvalid,
  isReadOnly,
  isIndeterminate,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp
}) => {
  const _ref = _react.default.useRef();

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
    checked: isChecked,
    disabled: isDisabled
  } = inputProps;
  const {
    icon,
    _interactionBox,
    _icon,
    _stack,
    _text,
    onPress,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Checkbox', { ...combinedProps,
    ...inputProps
  }, {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    isDisabled,
    isChecked,
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused
  });
  const [layoutProps, nonLayoutProps] = (0, _utils3.extractInObject)(resolvedProps, [..._utils3.stylingProps.margin, ..._utils3.stylingProps.layout, ..._utils3.stylingProps.flexbox, ..._utils3.stylingProps.position, '_text']);
  const [accessibilityProps, nonAccessibilityProps] = (0, _utils3.extractInObject)(nonLayoutProps, ['accessibilityRole', 'accessibilityState', 'accessibilityLabel', 'accessibilityHint']); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(resolvedProps)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    disabled: isDisabled
  }, pressableProps, accessibilityProps, {
    onPress: onPress,
    ref: (0, _utils.mergeRefs)([_ref, wrapperRef]),
    accessibilityRole: "checkbox",
    onPressIn: (0, _utils2.composeEventHandlers)(onPressIn, pressableProps.onPressIn),
    onPressOut: (0, _utils2.composeEventHandlers)(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: (0, _utils2.composeEventHandlers)(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: (0, _utils2.composeEventHandlers)(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: (0, _utils2.composeEventHandlers)((0, _utils2.composeEventHandlers)(onFocus, focusProps.onFocus) // focusRingProps.onFocu
    ) // @ts-ignore - web only
    ,
    onBlur: (0, _utils2.composeEventHandlers)((0, _utils2.composeEventHandlers)(onBlur, focusProps.onBlur) // focusRingProps.onBlur
    )
  }), /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({}, layoutProps, _stack), /*#__PURE__*/_react.default.createElement(_Center.Center, null, /*#__PURE__*/_react.default.createElement(_Box.default, _interactionBox), /*#__PURE__*/_react.default.createElement(_Center.Center, nonAccessibilityProps, /*#__PURE__*/_react.default.createElement(_SizedIcon.default, {
    icon: icon,
    _icon: _icon,
    isChecked: isChecked
  }))), (0, _wrapStringChild.wrapStringChild)(combinedProps.children, _text)));
});

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Checkbox));

exports.default = _default;
//# sourceMappingURL=Checkbox.js.map