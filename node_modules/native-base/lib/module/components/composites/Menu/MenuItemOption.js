function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo, useContext } from 'react';
import { CheckIcon } from '../../primitives/Icon/Icons';
import Text from '../../primitives/Text';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import MenuItem from './MenuItem';
import { MenuOptionContext } from './MenuOptionGroup';
import { useMenuOptionItem } from './useMenu';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const MenuItemOption = ({
  value,
  ...props
}, ref) => {
  const {
    values,
    onChange,
    type
  } = useContext(MenuOptionContext);
  const isChecked = values.includes(value);
  const menuOptionProps = useMenuOptionItem({
    isChecked,
    type
  });
  const {
    children,
    onPress,
    _icon,
    _text,
    ...resolvedProps
  } = usePropsResolution('MenuItem', props, {
    isChecked
  });

  const modifiedOnPress = e => {
    onChange(value);
    onPress && onPress(e);
  }; //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(MenuItem, _extends({}, resolvedProps, menuOptionProps, {
    accessibilityRole: "button",
    onPress: modifiedOnPress,
    ref: ref
  }), /*#__PURE__*/React.createElement(CheckIcon, _icon), React.Children.map(children, (child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/React.createElement(Text, _extends({
        key: "menu-item-option-".concat(index)
      }, _text), child);
    } else {
      return child;
    }
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(MenuItemOption));
//# sourceMappingURL=MenuItemOption.js.map