function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react'; //@ts-ignore

import stableHash from 'stable-hash';
import { mergeRefs } from '../../../utils';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { Center } from '../../composites/Center';
import { useFormControlContext } from '../../composites/FormControl';
import Box from '../Box';
import { useToggleState } from '@react-stately/toggle';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { CheckboxGroupContext } from './CheckboxGroup';
import { useHover } from '@react-native-aria/interactions';
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox';
import { useFocusRing } from '@react-native-aria/focus';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { combineContextAndProps } from '../../../utils';
import SizedIcon from './SizedIcon';
import { Stack } from '../Stack';
import { wrapStringChild } from '../../../utils/wrapStringChild';

const Checkbox = ({
  wrapperRef,
  isHovered: isHoveredProp,
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  const formControlContext = useFormControlContext();
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    ...combinedProps
  } = combineContextAndProps(formControlContext, props);
  const checkboxGroupContext = React.useContext(CheckboxGroupContext);
  const state = useToggleState({ ...props,
    defaultSelected: props.defaultIsChecked,
    isSelected: props.isChecked
  });

  const _ref = React.useRef();

  const mergedRef = mergeRefs([ref, _ref]); // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.

  const {
    inputProps: groupItemInputProps
  } = checkboxGroupContext ? // eslint-disable-next-line react-hooks/rules-of-hooks
  useCheckboxGroupItem({ ...combinedProps,
    'aria-label': combinedProps.accessibilityLabel,
    'value': combinedProps.value
  }, checkboxGroupContext.state, //@ts-ignore
  mergedRef) : // eslint-disable-next-line react-hooks/rules-of-hooks
  useCheckbox({ ...combinedProps,
    'aria-label': combinedProps.accessibilityLabel
  }, state, //@ts-ignore
  mergedRef); // eslint-disable-next-line react-hooks/exhaustive-deps

  const inputProps = React.useMemo(() => groupItemInputProps, [groupItemInputProps.checked, groupItemInputProps.disabled, groupItemInputProps]);
  const contextCombinedProps = React.useMemo(() => {
    return { ...checkboxGroupContext,
      ...combinedProps
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableHash(combinedProps)]);
  return /*#__PURE__*/React.createElement(CheckboxComponent, {
    wrapperRef: wrapperRef,
    mergedRef: mergedRef,
    inputProps: inputProps,
    combinedProps: contextCombinedProps,
    isInvalid: isInvalid,
    isReadOnly: isReadOnly,
    isHovered: isHoveredProp,
    isIndeterminate: isIndeterminate,
    isFocusVisible: isFocusVisibleProp
  });
};

const CheckboxComponent = /*#__PURE__*/React.memo(({
  wrapperRef,
  inputProps,
  combinedProps,
  isInvalid,
  isReadOnly,
  isIndeterminate,
  mergedRef,
  isHovered: isHoveredProp,
  isFocusVisible: isFocusVisibleProp
}) => {
  const _ref = React.useRef();

  const {
    isHovered
  } = useHover({}, _ref);
  const {
    checked: isChecked,
    disabled: isDisabled
  } = inputProps;
  const {
    focusProps,
    isFocusVisible
  } = useFocusRing();
  const {
    icon,
    _interactionBox,
    _icon,
    _stack,
    _text,
    ...resolvedProps
  } = usePropsResolution('Checkbox', combinedProps, {
    isInvalid,
    isReadOnly,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled,
    isIndeterminate,
    isChecked,
    isHovered: isHovered || isHoveredProp
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [...stylingProps.margin, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, '_text']);
  const component = React.useMemo(() => {
    return /*#__PURE__*/React.createElement(Stack, _extends({}, _stack, layoutProps), /*#__PURE__*/React.createElement(Center, null, /*#__PURE__*/React.createElement(Box, _interactionBox), /*#__PURE__*/React.createElement(Center, nonLayoutProps, /*#__PURE__*/React.createElement(SizedIcon, {
      icon: icon,
      _icon: _icon,
      isChecked: isChecked
    }))), wrapStringChild(resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.children, _text));
  }, [_icon, _stack, _text, _interactionBox, icon, isChecked, nonLayoutProps, layoutProps, resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.children]);
  const mergedWrapperRef = React.useMemo(() => mergeRefs([wrapperRef, _ref]), [wrapperRef]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box // @ts-ignore - RN web supports accessibilityRole="label"
  , {
    accessibilityRole: "label",
    ref: mergedWrapperRef
  }, /*#__PURE__*/React.createElement(VisuallyHidden, null, /*#__PURE__*/React.createElement("input", _extends({}, inputProps, focusProps, {
    ref: mergedRef
  }))), component);
});
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Checkbox));
//# sourceMappingURL=Checkbox.web.js.map