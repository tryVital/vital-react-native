function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useButton } from '@react-native-aria/button';
import { useComboBoxState } from '@react-stately/combobox';
import { useComboBox } from '@react-native-aria/combobox';
import { useListBox, useOption } from '@react-native-aria/listbox';
import { ScrollView, findNodeHandle, Platform } from 'react-native';
import { Item } from '@react-stately/collections';
import Box from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import Text from '../../primitives/Text';
import { extractInObject } from '../../../theme/tools';
import { layoutPropsList } from './types';
import { Input } from '../../primitives/Input';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const Typeahead = /*#__PURE__*/React.forwardRef(({
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
  if (useHasResponsiveProps(rest)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ComboBoxImplementation, _extends({}, rest, {
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
    return /*#__PURE__*/React.createElement(Item, {
      textValue: optionLabel,
      key: optionKey
    }, renderItem ? renderItem(item) : /*#__PURE__*/React.createElement(Box, {
      p: 2,
      justifyContent: "center"
    }, /*#__PURE__*/React.createElement(Text, null, optionLabel)));
  });
});
const ComboBoxImplementation = /*#__PURE__*/React.forwardRef((props, ref) => {
  const [layoutProps] = extractInObject(props, layoutPropsList);
  let state = useComboBoxState(props);
  let triggerRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);
  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps
  } = useComboBox({ ...props,
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
  } = useButton(triggerProps);
  return /*#__PURE__*/React.createElement(Box, _extends({
    flexDirection: "row"
  }, layoutProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(Box, {
    flex: 1
  }, props.label && /*#__PURE__*/React.createElement(Text, _extends({}, labelProps, {
    pb: 1
  }), props.label), /*#__PURE__*/React.createElement(Input, _extends({}, inputProps, {
    ref: inputRef,
    InputRightElement:
    /*#__PURE__*/
    // @ts-ignore - RN has hitSlop type inconsistent for View and Pressable!
    React.createElement(Pressable, _extends({}, buttonProps, {
      ref: triggerRef
    }), toggleIconSetter())
  })), state.isOpen && /*#__PURE__*/React.createElement(ListBoxPopup, _extends({}, listBoxProps, {
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
  } = useListBox({
    label,
    autoFocus: state.focusStrategy,
    disallowEmptySelection: true
  }, state, listBoxRef);
  return /*#__PURE__*/React.createElement(Box, {
    ref: popoverRef
  }, /*#__PURE__*/React.createElement(Box, {
    position: "absolute",
    width: "100%",
    maxHeight: dropdownHeight !== null && dropdownHeight !== void 0 ? dropdownHeight : 200
  }, /*#__PURE__*/React.createElement(ScrollView, _extends({}, listBoxProps, {
    keyboardShouldPersistTaps: "handled",
    ref: node => {
      if (Platform.OS === 'web') {
        listBoxRef.current = findNodeHandle(node);
      } else {
        listBoxRef.current = node;
      }
    }
  }), [...state.collection].map(item => /*#__PURE__*/React.createElement(Option, {
    key: item.key,
    item: item,
    state: state
  })))));
}

function Option({
  item,
  state
}) {
  const searchItemStyle = useThemeProps('TypeAheadSearchItem', {});
  let ref = React.useRef(null);
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let isFocused = state.selectionManager.focusedKey === item.key;
  let {
    optionProps
  } = useOption({
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

  return /*#__PURE__*/React.createElement(Pressable, _extends({}, optionProps, {
    opacity: opacity,
    cursor: isDisabled ? Platform.OS === 'web' ? 'not-allowed' : null : null,
    backgroundColor: backgroundColor,
    ref: ref
  }), item.rendered);
}
//# sourceMappingURL=Typeahead.js.map