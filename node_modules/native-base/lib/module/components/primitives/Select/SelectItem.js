function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import { Platform } from 'react-native';
import { Actionsheet } from '../../composites/Actionsheet';
import { SelectContext } from './Select';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const Item = ({
  isDisabled,
  label,
  value,
  ...props
}, ref) => {
  const {
    onValueChange,
    selectedValue,
    _selectedItem,
    _item
  } = React.useContext(SelectContext); //TODO: refactor for responsive prop

  if (useHasResponsiveProps({ ...props,
    isDisabled,
    label,
    value
  })) {
    return null;
  }

  if (Platform.OS !== 'web') {
    const isSelected = selectedValue === value;
    return /*#__PURE__*/React.createElement(Actionsheet.Item, _extends({
      ref: ref,
      onPress: () => {
        if (!isDisabled) {
          onValueChange(value);
        }
      },
      accessibilityState: {
        selected: isSelected
      }
    }, _item, isSelected && _selectedItem, props), label);
  } else {
    return /*#__PURE__*/React.createElement("option", {
      ref: ref,
      value: value,
      disabled: isDisabled
    }, label);
  }
};
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Item));
//# sourceMappingURL=SelectItem.js.map