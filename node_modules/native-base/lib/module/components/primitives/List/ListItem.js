function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { mergeRefs } from '../../../utils';
import { Pressable } from '../Pressable'; // import { useHover } from '@react-native-aria/interactions';

import { extractInObject } from '../../../theme/tools';
import { composeEventHandlers } from '../../../utils';
import { useHover, useFocus, useIsPressed } from '../../primitives/Pressable/Pressable';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ListItem = ({
  children,
  ...props
}, ref) => {
  const {
    hoverProps,
    isHovered
  } = useHover();
  const {
    pressableProps,
    isPressed
  } = useIsPressed();
  const {
    focusProps,
    isFocused
  } = useFocus();
  const {
    index,
    start,
    unordered,
    ul,
    ordered,
    ol,
    _text,
    borderTopWidth,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution('ListItem', props, {
    isHovered,
    isPressed,
    isFocused
  });

  const _ref = React.useRef(null); // const { isHovered } = useHover({}, _ref);
  //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  } // Extracting Pressable Props from resolvedProps


  const [pressableComponentProps, nonPressableProps] = extractInObject(resolvedProps, ['onPress', 'unstable_pressDelay', 'android_ripple', 'android_disableSound', 'delayLongPress', 'hitSlop', 'disabled', 'onLongPress', 'onPressIn', 'onPressOut', 'pressRetentionOffset', 'testOnly_pressed', 'onHoverIn', 'onHoverOut', 'onFocus', 'onBlur', '_pressed', '_focus']);
  return Object.keys(pressableComponentProps).length !== 0 ?
  /*#__PURE__*/
  // Checking if any Pressable Props present
  React.createElement(Pressable, _extends({
    accessibilityRole: "button",
    accessibilityLabel: "List-Item-".concat(index + start),
    flexDirection: "row",
    alignItems: "center"
  }, resolvedProps, {
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus) // focusRingProps.onFocu
    ) // @ts-ignore - web only
    ,
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur) // focusRingProps.onBlur
    ),
    borderTopWidth: index ? borderTopWidth : 0,
    ref: ref
  }), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ?
  /*#__PURE__*/
  //Adding disc in front of ListItem
  React.createElement(Box, {
    style: {
      transform: [{
        scale: 1.5
      }]
    },
    mr: 2 // _text={{
    //   fontWeight: 'bold',
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, "\u2022") : null, ol || ordered ?
  /*#__PURE__*/
  //Adding index number in front of ListItem
  React.createElement(Box, {
    mr: 2 // _text={{
    //   fontWeight: 'bold',
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, index + start + '.') : null), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    alignItems: "center" // _text={{
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, children))) :
  /*#__PURE__*/
  // If no Pressable Props passed by user render Box instead of Pressable
  React.createElement(Box, _extends({
    accessibilityRole: "text",
    accessibilityLabel: "List-Item-".concat(index + start),
    flexDirection: "row",
    alignItems: "center"
  }, nonPressableProps, {
    borderTopWidth: index ? borderTopWidth : 0,
    ref: mergeRefs([ref, _ref])
  }, isHovered && resolvedProps._hover, isPressed && resolvedProps._pressed, isFocused && resolvedProps._focus), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ?
  /*#__PURE__*/
  //Adding disc in front of ListItem
  React.createElement(Box, {
    style: {
      transform: [{
        scale: 1.5
      }]
    },
    mr: 2,
    _text: {
      fontWeight: 'bold',
      ..._text
    }
  }, "\u2022") : null, ol || ordered ?
  /*#__PURE__*/
  //Adding index number in front of ListItem
  React.createElement(Box, {
    mr: 2,
    _text: {
      fontWeight: 'bold',
      ..._text
    }
  }, index + start + '.') : null), /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    _text: _text // ...(isHovered && _hover?._text && { ..._hover._text }),

  }, children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ListItem));
//# sourceMappingURL=ListItem.js.map