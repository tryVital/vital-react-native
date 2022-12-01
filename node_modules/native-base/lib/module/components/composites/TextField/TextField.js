function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { usePropsResolution } from '../../../hooks';
import { Stack } from '../../primitives/Stack';
import { Input } from '../../primitives/Input';
import Text from '../../primitives/Text';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import Select from '../../primitives/Select';
import TextArea from '../../primitives/TextArea';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const TextField = (mainProps, ref) => {
  //TODO: Remove `any`
  const {
    children,
    helperText,
    errorMessage,
    InputLeftElement,
    InputRightElement,
    dropdownIcon,
    ...props
  } = mainProps;
  const {
    divider,
    _errorMessageProps,
    _helperTextProps,
    component,
    ...resolvedProps
  } = usePropsResolution('TextField', props);
  const [layoutProps, componentProps] = extractInObject(resolvedProps, ['space', 'reversed', ...stylingProps.margin, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  const activeComponent = () => {
    switch (component) {
      case 'select':
        return /*#__PURE__*/React.createElement(Select, _extends({}, componentProps, {
          dropdownIcon: dropdownIcon
        }), children);

      case 'textarea':
        return /*#__PURE__*/React.createElement(TextArea, _extends({}, componentProps, {
          ref: ref
        }));

      default:
        return /*#__PURE__*/React.createElement(Input, _extends({
          InputLeftElement: InputLeftElement,
          InputRightElement: InputRightElement
        }, componentProps, {
          ref: ref
        }));
    }
  };

  return /*#__PURE__*/React.createElement(Stack, _extends({
    divider: divider
  }, layoutProps), activeComponent(), componentProps.isInvalid && /*#__PURE__*/React.createElement(Text, _errorMessageProps, errorMessage), !componentProps.isInvalid && /*#__PURE__*/React.createElement(Text, _helperTextProps, helperText));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TextField));
//# sourceMappingURL=TextField.js.map