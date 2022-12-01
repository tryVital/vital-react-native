function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Input } from '../Input';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { useHover } from '@react-native-aria/interactions';
import { mergeRefs } from '../../../utils';

const TextArea = ({
  wrapperRef,
  isDisabled,
  isInvalid,
  isReadOnly,
  isFocused: isFocusedProp,
  isHovered: isHoveredProp,
  ...props
}, ref) => {
  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const [isFocused, setIsFocused] = React.useState(isFocusedProp);

  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };

  const {
    totalLines,
    onFocus,
    onBlur,
    ...newProps
  } = usePropsResolution('TextArea', props, {
    isHovered: isHoveredProp || isHovered,
    isDisabled,
    isFocused,
    isInvalid,
    isReadOnly
  }, {
    extendTheme: ['Input']
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Input, _extends({}, newProps, {
    INTERNAL_notResolveThemeAndPseudoProps: true,
    numberOfLines: totalLines,
    wrapperRef: wrapperRef,
    ref: mergeRefs([_ref, ref]),
    onFocus: e => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {});
    },
    onBlur: e => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {});
    },
    isDisabled: isDisabled,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(TextArea));
//# sourceMappingURL=index.js.map