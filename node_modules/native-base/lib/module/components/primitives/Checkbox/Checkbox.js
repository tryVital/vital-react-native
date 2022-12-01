function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, memo, forwardRef } from 'react'; //@ts-ignore

import stableHash from 'stable-hash';
import { Pressable } from '../Pressable';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { Center } from '../../composites/Center';
import { useFormControlContext } from '../../composites/FormControl';
import Box from '../Box';
import { mergeRefs } from './../../../utils';
import { useToggleState } from '@react-stately/toggle';
import { CheckboxGroupContext } from './CheckboxGroup';
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { composeEventHandlers, combineContextAndProps } from '../../../utils';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { useHover, useFocus, useIsPressed } from '../../primitives/Pressable/Pressable';
import SizedIcon from './SizedIcon';
import { Stack } from '../Stack';
import { wrapStringChild } from '../../../utils/wrapStringChild';

const Checkbox = ({
  wrapperRef,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp,
  ...props
}, ref) => {
  const formControlContext = useFormControlContext();
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    ...combinedProps
  } = combineContextAndProps(formControlContext, props);
  const checkboxGroupContext = useContext(CheckboxGroupContext);
  const state = useToggleState({ ...combinedProps,
    defaultSelected: combinedProps.defaultIsChecked,
    isSelected: combinedProps.isChecked
  });

  const _ref = React.useRef();

  const mergedRef = mergeRefs([ref, _ref]); // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.

  const {
    inputProps: groupItemInputProps
  } = checkboxGroupContext ? // eslint-disable-next-line react-hooks/rules-of-hooks
  useCheckboxGroupItem(combinedProps, checkboxGroupContext.state, //@ts-ignore
  mergedRef) : // eslint-disable-next-line react-hooks/rules-of-hooks
  useCheckbox(combinedProps, state, //@ts-ignore
  mergedRef); // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = React.useMemo(() => groupItemInputProps, [groupItemInputProps.checked, groupItemInputProps.disabled]);
  const contextCombinedProps = React.useMemo(() => {
    return { ...checkboxGroupContext,
      ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableHash(combinedProps)]);
  return /*#__PURE__*/React.createElement(CheckboxComponent, {
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly,
    isIndeterminate: isIndeterminate,
    isHovered: isHoveredProp,
    isPressed: isPressedProp,
    isFocused: isFocusedProp,
    wrapperRef: wrapperRef
  });
};

const CheckboxComponent = /*#__PURE__*/React.memo(({
  wrapperRef,
  inputProps,
  combinedProps,
  isInvalid,
  isReadOnly,
  isIndeterminate,
  isHovered: isHoveredProp,
  isPressed: isPressedProp,
  isFocused: isFocusedProp
}) => {
  const _ref = React.useRef();

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
    checked: isChecked,
    disabled: isDisabled
  } = inputProps;
  const {
    icon,
    _interactionBox,
    _icon,
    _stack,
    _text,
    onPress,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution('Checkbox', { ...combinedProps,
    ...inputProps
  }, {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    isDisabled,
    isChecked,
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, '_text']);
  const [accessibilityProps, nonAccessibilityProps] = extractInObject(nonLayoutProps, ['accessibilityRole', 'accessibilityState', 'accessibilityLabel', 'accessibilityHint']); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: isDisabled
  }, pressableProps, accessibilityProps, {
    onPress: onPress,
    ref: mergeRefs([_ref, wrapperRef]),
    accessibilityRole: "checkbox",
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
    )
  }), /*#__PURE__*/React.createElement(Stack, _extends({}, layoutProps, _stack), /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(Box, _interactionBox), /*#__PURE__*/React.createElement(Center, nonAccessibilityProps, /*#__PURE__*/React.createElement(SizedIcon, {
    icon: icon,
    _icon: _icon,
    isChecked: isChecked
  }))), wrapStringChild(combinedProps.children, _text)));
});
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Checkbox));
//# sourceMappingURL=Checkbox.js.map