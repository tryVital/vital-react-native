"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Actionsheet = require("../../composites/Actionsheet");

var _Box = _interopRequireDefault(require("../Box"));

var _Input = require("../Input");

var _focus = require("@react-native-aria/focus");

var _hooks = require("../../../hooks");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _interactions = require("@react-native-aria/interactions");

var _utils = require("../../../utils");

var _FormControl = require("../../composites/FormControl");

var _Icons = require("../Icon/Icons");

var _ScrollView = require("../../basic/ScrollView");

var _utils2 = require("../../../theme/tools/utils");

var _FlatList = require("../../basic/FlatList");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _Pressable = require("../Pressable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SelectContext = /*#__PURE__*/_react.default.createContext({
  onValueChange: () => {},
  selectedValue: null,
  _selectedItem: {},
  _item: {}
});

exports.SelectContext = SelectContext;

const Select = ({
  isHovered: isHoveredProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  variant,
  ...props
}, ref) => {
  const selectProps = (0, _FormControl.useFormControl)({
    isDisabled: props.isDisabled,
    nativeID: props.nativeID
  });
  const flatListData = [];
  const isDisabled = selectProps.disabled;
  const tempFix = '__NativebasePlaceholder__';

  const _ref = _react.default.useRef(null);

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const [isFocused, setIsFocused] = _react.default.useState(false);

  const {
    focusProps,
    isFocusVisible
  } = (0, _focus.useFocusRing)();
  const {
    hoverProps,
    isHovered
  } = (0, _interactions.useHover)({
    isDisabled
  }, _ref);
  const {
    onValueChange,
    selectedValue,
    children,
    dropdownIcon,
    dropdownCloseIcon,
    dropdownOpenIcon,
    placeholder,
    accessibilityLabel,
    defaultValue,
    _item,
    _selectedItem,
    onOpen,
    onClose,
    optimized,
    _customDropdownIconProps,
    _actionSheet,
    _actionSheetContent,
    _actionSheetBody,
    _webSelect,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Select', props, {
    isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isFocusVisible: isFocusVisibleProp || isFocusVisible
  }, undefined);
  const [value, setValue] = (0, _hooks.useControllableState)({
    value: selectedValue,
    defaultValue,
    onChange: newValue => {
      onValueChange && onValueChange(newValue);
      setIsOpen(false);
    }
  });

  const itemsList = _react.default.Children.toArray(children).map(child => {
    var _child$props, _child$props2;

    return {
      label: child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.label,
      value: child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.value
    };
  });

  const selectedItemArray = itemsList.filter(item => (item === null || item === void 0 ? void 0 : item.value) === value);
  const selectedItem = selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;

  const contextValue = _react.default.useMemo(() => {
    return {
      onValueChange: setValue,
      selectedValue: value,
      _selectedItem: _selectedItem !== null && _selectedItem !== void 0 ? _selectedItem : {},
      _item: _item !== null && _item !== void 0 ? _item : {}
    };
  }, [value, setValue, _selectedItem, _item]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  const rightIcon = isOpen && dropdownOpenIcon ? dropdownOpenIcon : !isOpen && dropdownCloseIcon ? dropdownCloseIcon : dropdownIcon ? dropdownIcon : /*#__PURE__*/_react.default.createElement(_Icons.ChevronDownIcon, _customDropdownIconProps);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  if (optimized) {
    _react.default.Children.toArray(children).map(child => {
      flatListData.push(child.props);
    });
  }

  const [layoutProps, nonLayoutProps] = (0, _utils2.extractInObject)(resolvedProps, [..._utils2.stylingProps.margin, ..._utils2.stylingProps.flexbox, ..._utils2.stylingProps.position, 'shadow', 'opacity']);

  const commonInput = /*#__PURE__*/_react.default.createElement(_Input.Input, _extends({
    placeholder: placeholder,
    InputRightElement: rightIcon
  }, nonLayoutProps, {
    // NOTE: Adding ts-ignore as we're not exposing isFocused in the Input component
    // @ts-ignore-next-line
    isFocused: isFocused,
    isHovered: isHovered,
    "aria-hidden": true,
    importantForAccessibility: "no",
    value: selectedItem ? selectedItem.label : '',
    editable: false,
    focusable: false,
    isDisabled: isDisabled,
    pointerEvents: "none",
    variant: variant
  }));

  return _reactNative.Platform.OS === 'android' || _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    onPress: () => {
      _reactNative.Keyboard.dismiss();

      setIsOpen(true);
      onOpen && onOpen();
    },
    disabled: isDisabled,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    ref: (0, _utils.mergeRefs)([ref, _ref])
  }, layoutProps), commonInput), /*#__PURE__*/_react.default.createElement(_Actionsheet.Actionsheet, _extends({
    isOpen: isOpen,
    onClose: handleClose
  }, _actionSheet), /*#__PURE__*/_react.default.createElement(_Actionsheet.Actionsheet.Content, _actionSheetContent, optimized ? /*#__PURE__*/_react.default.createElement(_FlatList.FlatList, _extends({}, _actionSheetBody, {
    data: flatListData // eslint-disable-next-line no-shadow
    ,
    keyExtractor: (_item, index) => index.toString(),
    renderItem: ({
      item
    }) => {
      const isSelected = selectedValue === (item === null || item === void 0 ? void 0 : item.value);
      return /*#__PURE__*/_react.default.createElement(_Actionsheet.Actionsheet.Item, _extends({
        onPress: () => {
          if (!isDisabled) {
            setValue(item === null || item === void 0 ? void 0 : item.value);
          }
        },
        accessibilityState: {
          selected: isSelected
        }
      }, item, _item, isSelected && _selectedItem), item === null || item === void 0 ? void 0 : item.label);
    }
  })) : /*#__PURE__*/_react.default.createElement(_ScrollView.ScrollView, _actionSheetBody, /*#__PURE__*/_react.default.createElement(SelectContext.Provider, {
    value: contextValue
  }, children))))) : /*#__PURE__*/_react.default.createElement(_Box.default, layoutProps, /*#__PURE__*/_react.default.createElement("select", _extends({
    "aria-readonly": selectProps.readOnly,
    required: selectProps.required,
    disabled: isDisabled
  }, focusProps, hoverProps, {
    ref: (0, _utils.mergeRefs)([ref, _ref]) //@ts-ignore
    ,
    onChange: e => {
      setValue(e.target.value);
    },
    value: selectedItem === null ? tempFix : value,
    "aria-label": placeholder,
    onFocus: () => {
      setIsFocused(true);
      onOpen && onOpen();
    },
    onBlur: () => {
      setIsFocused(false);
      onClose && onClose();
    }
  }, _webSelect), /*#__PURE__*/_react.default.createElement("option", {
    disabled: true,
    value: tempFix
  }, placeholder), children), commonInput);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Select));

exports.default = _default;
//# sourceMappingURL=Select.js.map