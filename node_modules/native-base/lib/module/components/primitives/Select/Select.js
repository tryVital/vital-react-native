function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import { Platform, Keyboard } from 'react-native';
import { Actionsheet } from '../../composites/Actionsheet';
import Box from '../Box';
import { Input } from '../Input';
import { useFocusRing } from '@react-native-aria/focus';
import { useControllableState } from '../../../hooks';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHover } from '@react-native-aria/interactions';
import { mergeRefs } from '../../../utils';
import { useFormControl } from '../../composites/FormControl';
import { ChevronDownIcon } from '../Icon/Icons';
import { ScrollView } from '../../basic/ScrollView';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { FlatList } from '../../basic/FlatList';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { Pressable } from '../Pressable';
export const SelectContext = /*#__PURE__*/React.createContext({
  onValueChange: () => {},
  selectedValue: null,
  _selectedItem: {},
  _item: {}
});

const Select = ({
  isHovered: isHoveredProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  variant,
  ...props
}, ref) => {
  const selectProps = useFormControl({
    isDisabled: props.isDisabled,
    nativeID: props.nativeID
  });
  const flatListData = [];
  const isDisabled = selectProps.disabled;
  const tempFix = '__NativebasePlaceholder__';

  const _ref = React.useRef(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const {
    focusProps,
    isFocusVisible
  } = useFocusRing();
  const {
    hoverProps,
    isHovered
  } = useHover({
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
  } = usePropsResolution('Select', props, {
    isDisabled,
    isHovered: isHoveredProp || isHovered,
    isFocused: isFocusedProp || isFocused,
    isFocusVisible: isFocusVisibleProp || isFocusVisible
  }, undefined);
  const [value, setValue] = useControllableState({
    value: selectedValue,
    defaultValue,
    onChange: newValue => {
      onValueChange && onValueChange(newValue);
      setIsOpen(false);
    }
  });
  const itemsList = React.Children.toArray(children).map(child => {
    var _child$props, _child$props2;

    return {
      label: child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.label,
      value: child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.value
    };
  });
  const selectedItemArray = itemsList.filter(item => (item === null || item === void 0 ? void 0 : item.value) === value);
  const selectedItem = selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;
  const contextValue = React.useMemo(() => {
    return {
      onValueChange: setValue,
      selectedValue: value,
      _selectedItem: _selectedItem !== null && _selectedItem !== void 0 ? _selectedItem : {},
      _item: _item !== null && _item !== void 0 ? _item : {}
    };
  }, [value, setValue, _selectedItem, _item]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  const rightIcon = isOpen && dropdownOpenIcon ? dropdownOpenIcon : !isOpen && dropdownCloseIcon ? dropdownCloseIcon : dropdownIcon ? dropdownIcon : /*#__PURE__*/React.createElement(ChevronDownIcon, _customDropdownIconProps);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  if (optimized) {
    React.Children.toArray(children).map(child => {
      flatListData.push(child.props);
    });
  }

  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.flexbox, ...stylingProps.position, 'shadow', 'opacity']);
  const commonInput = /*#__PURE__*/React.createElement(Input, _extends({
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
  return Platform.OS === 'android' || Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Pressable, _extends({
    onPress: () => {
      Keyboard.dismiss();
      setIsOpen(true);
      onOpen && onOpen();
    },
    disabled: isDisabled,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    ref: mergeRefs([ref, _ref])
  }, layoutProps), commonInput), /*#__PURE__*/React.createElement(Actionsheet, _extends({
    isOpen: isOpen,
    onClose: handleClose
  }, _actionSheet), /*#__PURE__*/React.createElement(Actionsheet.Content, _actionSheetContent, optimized ? /*#__PURE__*/React.createElement(FlatList, _extends({}, _actionSheetBody, {
    data: flatListData // eslint-disable-next-line no-shadow
    ,
    keyExtractor: (_item, index) => index.toString(),
    renderItem: ({
      item
    }) => {
      const isSelected = selectedValue === (item === null || item === void 0 ? void 0 : item.value);
      return /*#__PURE__*/React.createElement(Actionsheet.Item, _extends({
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
  })) : /*#__PURE__*/React.createElement(ScrollView, _actionSheetBody, /*#__PURE__*/React.createElement(SelectContext.Provider, {
    value: contextValue
  }, children))))) : /*#__PURE__*/React.createElement(Box, layoutProps, /*#__PURE__*/React.createElement("select", _extends({
    "aria-readonly": selectProps.readOnly,
    required: selectProps.required,
    disabled: isDisabled
  }, focusProps, hoverProps, {
    ref: mergeRefs([ref, _ref]) //@ts-ignore
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
  }, _webSelect), /*#__PURE__*/React.createElement("option", {
    disabled: true,
    value: tempFix
  }, placeholder), children), commonInput);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Select));
//# sourceMappingURL=Select.js.map