import { useTypeaheadReducer } from './reducer';
import React, { useEffect } from 'react';
import * as stateChangeTypes from './types';
import { Keyboard } from 'react-native';
import { dropdownDefaultStateValues, getDefaultValue } from './utils';

function isControlledProp(props, key) {
  return props[key] !== undefined;
}

export function useTypeahead(props) {
  let defaultValues = { ...dropdownDefaultStateValues
  };
  defaultValues.isOpen = getDefaultValue(props, 'isOpen');
  const [state, dispatch] = React.useReducer(useTypeaheadReducer, defaultValues);

  const dispatchWithProps = object => {
    dispatch({ ...object,
      props
    });
  };

  const {
    inputValue,
    isOpen
  } = state;
  const {
    items,
    onInputValueChange,
    onSelectedItemChange,
    selectedItem,
    itemToString
  } = props;
  const isControlled = isControlledProp(props, 'selectedItem');
  useEffect(() => {
    if (isControlled) {
      dispatch({
        type: stateChangeTypes.ControlledPropUpdatedSelectedItem,
        inputValue: itemToString(selectedItem)
      });
    }
  }, [selectedItem, isControlled, itemToString]);

  const onChangeText = text => {
    onInputValueChange === null || onInputValueChange === void 0 ? void 0 : onInputValueChange({
      inputValue: text
    });
    dispatchWithProps({
      type: stateChangeTypes.InputChange,
      inputValue: text
    });
  };

  const handleItemSelect = (item, index) => {
    onSelectedItemChange === null || onSelectedItemChange === void 0 ? void 0 : onSelectedItemChange(item);
    dispatchWithProps({
      type: stateChangeTypes.ItemClick,
      index
    });
    Keyboard.dismiss();
  };

  const getMenuItemProps = (item, index) => {
    return {
      onPress: () => handleItemSelect(item, index),
      accessible: true,
      accessiblityRole: 'menuitem'
    };
  };

  const getMenuProps = () => {
    return {
      accessible: true,
      accessibilityRole: 'menu',
      accessibilityHint: "Showing ".concat(items.length, " records")
    };
  };

  const getToggleButtonProps = () => {
    return {
      onPress: () => {
        dispatchWithProps({
          type: stateChangeTypes.ToggleButtonClick
        });
      }
    };
  };

  const getInputProps = (propInputVal, propOnchangeText) => {
    return {
      onChangeText: propInputVal ? propOnchangeText : onChangeText,
      value: propInputVal ? propInputVal : inputValue,
      accessibilityRole: 'combobox',
      accessibilityLabel: 'Typeahead input',
      accessibilityState: {
        expanded: isOpen
      }
    };
  };

  return {
    getInputProps,
    getMenuItemProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen
  };
}
//# sourceMappingURL=useTypeahead.js.map