function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Platform } from 'react-native';
import Box from '../Box';
import Text from '../Text';
import { usePropsResolution } from '../../../hooks';
import { useLink } from './useLink';
import { mergeRefs } from '../../../utils';
import { Pressable } from '../Pressable';
import { useHover } from '@react-native-aria/interactions';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Link = ({
  isHovered: isHoveredProp,
  ...props
}, ref) => {
  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const {
    isUnderlined,
    children,
    _text,
    href,
    onPress,
    isExternal,
    ...resolvedProps
  } = usePropsResolution('Link', props, {
    isHovered: isHoveredProp || isHovered
  });
  const {
    linkProps
  } = useLink({
    href,
    onPress,
    isExternal,
    _ref
  });
  const linkTextProps = {
    textDecorationLine: isUnderlined ? 'underline' : 'none',
    ..._text
  }; // function getHoverProps() {
  //   let hoverTextProps = {
  //     ...linkTextProps,
  //     ..._hover?._text,
  //   };
  //   return {
  //     ...hoverTextProps,
  //   };
  // }
  //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, Platform.OS === 'web' ? /*#__PURE__*/React.createElement(Box, _extends({}, linkProps, resolvedProps, {
    _text: linkTextProps,
    ref: mergeRefs([ref, _ref]),
    flexDirection: "row"
  }), children) : /*#__PURE__*/React.createElement(Pressable, _extends({}, linkProps, resolvedProps, {
    ref: ref,
    flexDirection: "row"
  }), React.Children.map(children, child => typeof child === 'string' || typeof child === 'number' ? /*#__PURE__*/React.createElement(Text, _extends({}, resolvedProps._text, linkTextProps), child) : child)));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Link));
//# sourceMappingURL=index.js.map