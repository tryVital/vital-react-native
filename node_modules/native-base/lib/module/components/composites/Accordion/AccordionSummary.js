function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import Box from '../../primitives/Box';
import { AccordionItemContext } from './Context';
import { useThemeProps } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { useHover } from '@react-native-aria/interactions';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const AccordionSummary = ({
  children,
  ...props
}, ref) => {
  const {
    index,
    isOpen,
    isDisabled,
    onOpen,
    onClose
  } = React.useContext(AccordionItemContext);
  const {
    _hover,
    _expanded,
    _disabled,
    ...themedProps
  } = useThemeProps('AccordionSummary', props);

  const pressHandler = () => {
    isOpen ? onClose && onClose() : onOpen && onOpen();
  };

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 0.2,
    disabled: isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityRole: "checkbox",
    ref: mergeRefs([ref, _ref])
  }, /*#__PURE__*/React.createElement(Box, _extends({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }, themedProps, isHovered && _hover, isOpen && _expanded, isDisabled && _disabled, !index && {
    borderTopColor: 'transparent'
  }, Platform.OS === 'web' ? {
    disabled: isDisabled,
    cursor: isDisabled ? 'not-allowed' : 'auto'
  } : {}), children));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(AccordionSummary));
//# sourceMappingURL=AccordionSummary.js.map