"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Typeahead = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = require("@react-native-aria/button");

var _combobox = require("@react-stately/combobox");

var _combobox2 = require("@react-native-aria/combobox");

var _listbox = require("@react-native-aria/listbox");

var _reactNative = require("react-native");

var _collections = require("@react-stately/collections");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Pressable = require("../../primitives/Pressable");

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _tools = require("../../../theme/tools");

var _types = require("./types");

var _Input = require("../../primitives/Input");

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Typeahead = /*#__PURE__*/_react.default.forwardRef(({
  onSelectedItemChange,
  options,
  renderItem,
  getOptionLabel,
  getOptionKey,
  onChange,
  numberOfItems,
  ...rest
}, ref) => {
  //TODO: refactor for responsive prop
  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(rest)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(ComboBoxImplementation, _extends({}, rest, {
    onSelectionChange: onSelectedItemChange,
    items: numberOfItems !== undefined ? options.slice(0, numberOfItems) : options,
    onInputChange: onChange,
    ref: ref
  }), item => {
    if (typeof item !== 'string' && getOptionLabel === undefined) {
      throw new Error('Please use getOptionLabel prop');
    }

    if (item.id === undefined && getOptionKey === undefined) {
      throw new Error('Please use getOptionKey prop');
    }

    const optionLabel = getOptionLabel ? getOptionLabel(item) : item;
    const optionKey = getOptionKey ? getOptionKey(item) : item.id !== undefined ? item.id : optionLabel;
    return /*#__PURE__*/_react.default.createElement(_collections.Item, {
      textValue: optionLabel,
      key: optionKey
    }, renderItem ? renderItem(item) : /*#__PURE__*/_react.default.createElement(_Box.default, {
      p: 2,
      justifyContent: "center"
    }, /*#__PURE__*/_react.default.createElement(_Text.default, null, optionLabel)));
  });
});

exports.Typeahead = Typeahead;

const ComboBoxImplementation = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const [layoutProps] = (0, _tools.extractInObject)(props, _types.layoutPropsList);
  let state = (0, _combobox.useComboBoxState)(props);

  let triggerRef = _react.default.useRef(null);

  let inputRef = _react.default.useRef(null);

  let listBoxRef = _react.default.useRef(null);

  let popoverRef = _react.default.useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps
  } = (0, _combobox2.useComboBox)({ ...props,
    inputRef,
    buttonRef: triggerRef,
    listBoxRef,
    popoverRef,
    menuTrigger: 'input'
  }, state);

  const toggleIconSetter = () => {
    if (typeof props.toggleIcon === 'function') return props.toggleIcon({
      isOpen: state.isOpen
    });
    return props.toggleIcon;
  };

  let {
    buttonProps
  } = (0, _button.useButton)(triggerProps);
  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    flexDirection: "row"
  }, layoutProps, {
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flex: 1
  }, props.label && /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, labelProps, {
    pb: 1
  }), props.label), /*#__PURE__*/_react.default.createElement(_Input.Input, _extends({}, inputProps, {
    ref: inputRef,
    InputRightElement:
    /*#__PURE__*/
    // @ts-ignore - RN has hitSlop type inconsistent for View and Pressable!
    _react.default.createElement(_Pressable.Pressable, _extends({}, buttonProps, {
      ref: triggerRef
    }), toggleIconSetter())
  })), state.isOpen && /*#__PURE__*/_react.default.createElement(ListBoxPopup, _extends({}, listBoxProps, {
    listBoxRef: listBoxRef,
    popoverRef: popoverRef,
    state: state,
    label: props.label
  }))));
});

function ListBoxPopup(props) {
  let {
    popoverRef,
    listBoxRef,
    state,
    dropdownHeight,
    label
  } = props;
  let {
    listBoxProps
  } = (0, _listbox.useListBox)({
    label,
    autoFocus: state.focusStrategy,
    disallowEmptySelection: true
  }, state, listBoxRef);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    ref: popoverRef
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    position: "absolute",
    width: "100%",
    maxHeight: dropdownHeight !== null && dropdownHeight !== void 0 ? dropdownHeight : 200
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({}, listBoxProps, {
    keyboardShouldPersistTaps: "handled",
    ref: node => {
      if (_reactNative.Platform.OS === 'web') {
        listBoxRef.current = (0, _reactNative.findNodeHandle)(node);
      } else {
        listBoxRef.current = node;
      }
    }
  }), [...state.collection].map(item => /*#__PURE__*/_react.default.createElement(Option, {
    key: item.key,
    item: item,
    state: state
  })))));
}

function Option({
  item,
  state
}) {
  const searchItemStyle = (0, _hooks.useThemeProps)('TypeAheadSearchItem', {});

  let ref = _react.default.useRef(null);

  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let isFocused = state.selectionManager.focusedKey === item.key;
  let {
    optionProps
  } = (0, _listbox.useOption)({
    key: item.key,
    isDisabled,
    isSelected,
    shouldFocusOnHover: true,
    shouldUseVirtualFocus: true
  }, state, ref);
  let backgroundColor = searchItemStyle.backgroundColor;
  let opacity = 1;

  if (isSelected) {
    backgroundColor = searchItemStyle._focus.backgroundColor;
  } else if (isFocused) {
    backgroundColor = searchItemStyle._focus.backgroundColor;
  } else if (isDisabled) {
    opacity = 0.6;
    backgroundColor = searchItemStyle._disabled.backgroundColor;
  }

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({}, optionProps, {
    opacity: opacity,
    cursor: isDisabled ? _reactNative.Platform.OS === 'web' ? 'not-allowed' : null : null,
    backgroundColor: backgroundColor,
    ref: ref
  }), item.rendered);
}
//# sourceMappingURL=Typeahead.js.map