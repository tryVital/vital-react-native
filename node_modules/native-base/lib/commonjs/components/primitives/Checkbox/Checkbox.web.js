"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _stableHash = _interopRequireDefault(require("stable-hash"));

var _utils = require("../../../utils");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Center = require("../../composites/Center");

var _FormControl = require("../../composites/FormControl");

var _Box = _interopRequireDefault(require("../Box"));

var _toggle = require("@react-stately/toggle");

var _visuallyHidden = require("@react-aria/visually-hidden");

var _CheckboxGroup = require("./CheckboxGroup");

var _interactions = require("@react-native-aria/interactions");

var _checkbox = require("@react-native-aria/checkbox");

var _focus = require("@react-native-aria/focus");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils2 = require("../../../theme/tools/utils");

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
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  const formControlContext = (0, _FormControl.useFormControlContext)();
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    ...combinedProps
  } = (0, _utils.combineContextAndProps)(formControlContext, props);

  const checkboxGroupContext = _react.default.useContext(_CheckboxGroup.CheckboxGroupContext);

  const state = (0, _toggle.useToggleState)({ ...props,
    defaultSelected: props.defaultIsChecked,
    isSelected: props.isChecked
  });

  const _ref = _react.default.useRef();

  const mergedRef = (0, _utils.mergeRefs)([ref, _ref]); // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.

  const {
    inputProps: groupItemInputProps
  } = checkboxGroupContext ? // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _checkbox.useCheckboxGroupItem)({ ...combinedProps,
    'aria-label': combinedProps.accessibilityLabel,
    'value': combinedProps.value
  }, checkboxGroupContext.state, //@ts-ignore
  mergedRef) : // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _checkbox.useCheckbox)({ ...combinedProps,
    'aria-label': combinedProps.accessibilityLabel
  }, state, //@ts-ignore
  mergedRef); // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = _react.default.useMemo(() => groupItemInputProps, [groupItemInputProps.checked, groupItemInputProps.disabled, groupItemInputProps]);

  const contextCombinedProps = _react.default.useMemo(() => {
    return { ...checkboxGroupContext,
      ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(0, _stableHash.default)(combinedProps)]);

  return /*#__PURE__*/_react.default.createElement(CheckboxComponent, {
    wrapperRef: wrapperRef,
    mergedRef: mergedRef,
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly,
    isHovered: isHoveredProp,
    isIndeterminate: isIndeterminate,
    isFocusVisible: isFocusVisibleProp
  });
};

const CheckboxComponent = /*#__PURE__*/_react.default.memo(({
  wrapperRef,
  inputProps,
  combinedProps,
  isInvalid,
  isReadOnly,
  isIndeterminate,
  mergedRef,
  isHovered: isHoveredProp,
  isFocusVisible: isFocusVisibleProp
}) => {
  const _ref = _react.default.useRef();

  const {
    isHovered
  } = (0, _interactions.useHover)({}, _ref);
  const {
    checked: isChecked,
    disabled: isDisabled
  } = inputProps;
  const {
    focusProps,
    isFocusVisible
  } = (0, _focus.useFocusRing)();
  const {
    icon,
    _interactionBox,
    _icon,
    _stack,
    _text,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Checkbox', combinedProps, {
    isInvalid,
    isReadOnly,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled,
    isIndeterminate,
    isChecked,
    isHovered: isHovered || isHoveredProp
  });
  const [layoutProps, nonLayoutProps] = (0, _utils2.extractInObject)(resolvedProps, [..._utils2.stylingProps.margin, ..._utils2.stylingProps.layout, ..._utils2.stylingProps.flexbox, ..._utils2.stylingProps.position, '_text']);

  const component = _react.default.useMemo(() => {
    return /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({}, _stack, layoutProps), /*#__PURE__*/_react.default.createElement(_Center.Center, null, /*#__PURE__*/_react.default.createElement(_Box.default, _interactionBox), /*#__PURE__*/_react.default.createElement(_Center.Center, nonLayoutProps, /*#__PURE__*/_react.default.createElement(_SizedIcon.default, {
      icon: icon,
      _icon: _icon,
      isChecked: isChecked
    }))), (0, _wrapStringChild.wrapStringChild)(resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.children, _text));
  }, [_icon, _stack, _text, _interactionBox, icon, isChecked, nonLayoutProps, layoutProps, resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.children]);

  const mergedWrapperRef = _react.default.useMemo(() => (0, _utils.mergeRefs)([wrapperRef, _ref]), [wrapperRef]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(resolvedProps)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default // @ts-ignore - RN web supports accessibilityRole="label"
  , {
    accessibilityRole: "label",
    ref: mergedWrapperRef
  }, /*#__PURE__*/_react.default.createElement(_visuallyHidden.VisuallyHidden, null, /*#__PURE__*/_react.default.createElement("input", _extends({}, inputProps, focusProps, {
    ref: mergedRef
  }))), component);
});

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Checkbox));

exports.default = _default;
//# sourceMappingURL=Checkbox.web.js.map