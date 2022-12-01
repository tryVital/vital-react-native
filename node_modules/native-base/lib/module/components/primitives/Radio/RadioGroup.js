function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Stack } from '../Stack';
import { useFormControlContext } from '../../composites/FormControl';
import { useRadioGroupState } from '@react-stately/radio';
import { useRadioGroup } from '@react-native-aria/radio';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks/useThemeProps';
export const RadioContext = /*#__PURE__*/React.createContext({});
const RadioWrapper = /*#__PURE__*/memo(props => {
  const resolvedProps = usePropsResolution('RadioGroup', props);
  return /*#__PURE__*/React.createElement(Stack, _extends({}, resolvedProps, props.radioGroupProps, props));
});

const RadioGroup = ({
  size,
  colorScheme,
  _radio,
  children,
  ...props
}, ref) => {
  const formControlContext = useFormControlContext();
  const state = useRadioGroupState(props);
  const radioGroupState = useRadioGroup({ ...formControlContext,
    ...props,
    'aria-label': props.accessibilityLabel
  }, state);
  const [propsState] = React.useState(props);
  const contextValue = React.useMemo(() => {
    return {
      formControlContext,
      size,
      colorScheme,
      ..._radio,
      state
    };
  }, [size, colorScheme, formControlContext, state, _radio]);
  const radioGroupProps = React.useMemo(() => radioGroupState.radioGroupProps, // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //TODO: refactor for responsive prop

  if (useHasResponsiveProps({ ...props,
    size,
    colorScheme
  })) {
    return null;
  }

  return /*#__PURE__*/React.createElement(RadioContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(RadioWrapper, _extends({}, radioGroupProps, propsState, {
    ref: ref
  }), children));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(RadioGroup));
//# sourceMappingURL=RadioGroup.js.map