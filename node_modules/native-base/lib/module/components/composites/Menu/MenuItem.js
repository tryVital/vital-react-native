function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import Text from '../../primitives/Text';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { Pressable } from '../../primitives/Pressable';
import { MenuContext } from './MenuContext';
import { useMenuItem } from './useMenu';
import { mergeRefs } from '../../../utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { HStack } from '../../primitives';

const MenuItem = ({
  children,
  isDisabled,
  onPress,
  textValue,
  ...props
}, ref) => {
  const {
    closeOnSelect,
    onClose
  } = React.useContext(MenuContext);
  const menuItemRef = React.useRef(null);
  const mergedRef = mergeRefs([menuItemRef, ref]);
  const {
    _text,
    _stack,
    ...resolvedProps
  } = usePropsResolution('MenuItem', props, {
    isDisabled
  }, {
    cascadePseudoProps: true
  });
  const [textContent, setTextContent] = React.useState('');
  React.useEffect(() => {
    const menuItem = menuItemRef.current;

    if (menuItem) {
      var _menuItem$textContent;

      setTextContent(((_menuItem$textContent = menuItem.textContent) !== null && _menuItem$textContent !== void 0 ? _menuItem$textContent : '').trim());
    }
  }, [children]);
  const menuItemProps = useMenuItem({
    textValue: textValue !== null && textValue !== void 0 ? textValue : textContent,
    ref: menuItemRef
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({}, menuItemProps, resolvedProps, {
    ref: mergedRef,
    disabled: isDisabled,
    accessibilityState: {
      disabled: isDisabled
    },
    onPress: e => {
      if (!isDisabled) {
        onPress && onPress(e);

        if (closeOnSelect) {
          onClose && onClose();
        }
      }
    }
  }), /*#__PURE__*/React.createElement(HStack, _stack, React.Children.map(children, (child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/React.createElement(Text, _extends({
        key: "menu-item-".concat(index)
      }, _text), child);
    } else {
      return child;
    }
  })));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(MenuItem));
//# sourceMappingURL=MenuItem.js.map