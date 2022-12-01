function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react'; //@ts-ignore

import stableHash from 'stable-hash';
import Box from '../Box';
import { Stack } from '../Stack';
import { Center } from '../../composites/Center';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { wrapStringChild } from '../../../utils/wrapStringChild';
import { mergeRefs } from './../../../utils';
import { useHover } from '@react-native-aria/interactions';
import { useRadio } from '@react-native-aria/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { RadioContext } from './RadioGroup';
import { useFocusRing } from '@react-native-aria/focus';
import { CircleIcon } from '../Icon/Icons';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { combineContextAndProps, isEmptyObj } from '../../../utils';
import { useFormControlContext } from '../../composites/FormControl';
const RadioComponent = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(({
  icon,
  inputProps,
  combinedProps,
  children,
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate
  } = combinedProps;
  const {
    disabled: isDisabled,
    checked: isChecked
  } = inputProps;

  const _ref = React.useRef(null);

  const {
    isHovered
  } = useHover({}, _ref);
  const mergedRefs = mergeRefs([_ref, wrapperRef]);
  const {
    focusProps,
    isFocusVisible
  } = useFocusRing();
  const [isFocused, setFocused] = React.useState(isFocusedProp);
  const [isPressed, setPressed] = React.useState(isPressedProp);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    isFocusedProp ? setFocused(true) : setFocused(false);
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    isPressedProp ? setPressed(true) : setPressed(false);
  };

  const {
    _interactionBox,
    _icon,
    _stack,
    _text,
    ...resolvedProps
  } = usePropsResolution('Radio', combinedProps, {
    isInvalid,
    isReadOnly,
    isFocusVisible: isFocusVisibleProp || isFocused || isFocusVisible,
    isDisabled,
    isIndeterminate,
    isChecked,
    isHovered: isHoveredProp || isHovered,
    isPressed,
    isFocused
  }); // only calling below function when icon exist.

  const sizedIcon = () =>
  /*#__PURE__*/
  //@ts-ignore
  React.cloneElement(icon, { ..._icon
  });

  const component = /*#__PURE__*/React.createElement(Stack, _stack, /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(Box, _interactionBox), /*#__PURE__*/React.createElement(Center, resolvedProps, icon && sizedIcon && isChecked ? sizedIcon() : /*#__PURE__*/React.createElement(CircleIcon, _extends({}, _icon, {
    opacity: isChecked ? 1 : 0
  })))), wrapStringChild(children, _text)); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box // @ts-ignore - RN web supports accessibilityRole="label"
  , {
    accessibilityRole: "label",
    ref: mergedRefs
  }, /*#__PURE__*/React.createElement("div", {
    onMouseDown: handlePressIn,
    onMouseUp: handlePressOut
  }, /*#__PURE__*/React.createElement(VisuallyHidden, null, /*#__PURE__*/React.createElement("input", _extends({}, inputProps, focusProps, {
    ref: ref,
    onFocus: handleFocus,
    onBlur: handleBlur
  }))), component));
}));

const Radio = ({
  icon,
  children,
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed,
  isFocused: isFocusedProp,
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  var _contextState$state;

  const formControlContext = useFormControlContext();
  const contextState = React.useContext(RadioContext);
  const combinedProps = combineContextAndProps({ ...formControlContext,
    ...contextState
  }, props);
  const inputRef = React.useRef(null);
  const radioState = useRadio({ ...combinedProps,
    'aria-label': props.accessibilityLabel,
    children
  }, (_contextState$state = contextState.state) !== null && _contextState$state !== void 0 ? _contextState$state : {}, inputRef); //@ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = React.useMemo(() => radioState.inputProps, [radioState.inputProps.checked, radioState.inputProps.disabled]);
  const contextCombinedProps = React.useMemo(() => {
    return { ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableHash(combinedProps)]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (isEmptyObj(contextState)) {
    console.error('Error: Radio must be wrapped inside a Radio.Group');
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement(RadioComponent, {
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    children: children,
    ref: ref,
    icon: icon,
    wrapperRef: wrapperRef,
    isHovered: isHoveredProp,
    isPressed: isPressed,
    isFocused: isFocusedProp,
    isFocusVisible: isFocusVisibleProp
  });
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Radio));
//# sourceMappingURL=Radio.web.js.map