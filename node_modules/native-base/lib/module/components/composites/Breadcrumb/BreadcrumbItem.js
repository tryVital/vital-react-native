function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import { Platform } from 'react-native';
import { HStack } from '../../primitives/Stack';
import { BreadcrumbItemContext } from './Context';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const BreadcrumbItem = (props, ref) => {
  const {
    children,
    isCurrent,
    _text,
    ...remainingProps
  } = props; //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return (
    /*#__PURE__*/
    // Provider wrapped to use isCurrent prop in children of breadcrumb Item
    React.createElement(BreadcrumbItemContext.Provider, {
      value: {
        isCurrent
      }
    }, /*#__PURE__*/React.createElement(HStack, _extends({}, remainingProps, {
      ref: ref
    }), React.Children.map(children, (child, index) => /*#__PURE__*/React.cloneElement(child, {
      'key': "breadcrumb-item-".concat(index),
      '_text': { ..._text,
        //taken out empty _text prop from props
        fontWeight: 700
      },
      ...{
        isUnderlined: false
      },
      ...remainingProps,
      'aria-current': Platform.OS === 'web' && isCurrent ? 'page' : undefined
    }))))
  );
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(BreadcrumbItem));
//# sourceMappingURL=BreadcrumbItem.js.map