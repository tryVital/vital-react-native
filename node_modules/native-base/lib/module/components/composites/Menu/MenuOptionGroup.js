function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import MenuGroup from './MenuGroup';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
export const MenuOptionContext = /*#__PURE__*/React.createContext({
  values: [],
  onChange: _val => {},
  type: 'checkbox'
});

const MenuOptionGroup = ({
  type,
  defaultValue,
  value,
  onChange,
  ...props
}, ref) => {
  const internalDefaultValue = defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];
  const [internalValues, setValues] = React.useState(internalDefaultValue);

  const _onChange = newValue => {
    if (type === 'checkbox') {
      const newValues = [...internalValues];

      if (internalValues.includes(newValue)) {
        newValues.splice(newValues.indexOf(newValue), 1);
        setValues(newValues);
      } else {
        newValues.push(newValue);
        setValues(newValues);
      }

      onChange && onChange(newValues);
    } else if (type === 'radio') {
      setValues([newValue]);
      onChange && onChange(newValue);
    }
  }; //TODO: refactor for responsive prop


  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(MenuOptionContext.Provider, {
    value: {
      values: !value ? internalValues : Array.isArray(value) ? value : [value],
      onChange: _onChange,
      type
    }
  }, /*#__PURE__*/React.createElement(MenuGroup, _extends({}, props, {
    ref: ref
  })));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(MenuOptionGroup));
//# sourceMappingURL=MenuOptionGroup.js.map