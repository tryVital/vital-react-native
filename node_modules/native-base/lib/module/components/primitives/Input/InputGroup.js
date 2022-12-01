function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { getAttachedChildren } from '../../../utils';
import { HStack } from '../Stack';
import { extractInObject, stylingProps } from '../../../theme/tools/utils';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const supplyPropsToChildren = (children, props) => {
  if (children.length >= 2) {
    const result = [];
    const firstChild = children[0];
    const firstChildProps = { ...firstChild.props.children,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    };
    result.push( /*#__PURE__*/React.cloneElement(firstChild, firstChildProps, firstChild.props.children));

    for (let i = 1; i < children.length - 1; i++) {
      const child = children[i];
      const newProps = { ...props,
        borderRadius: '0'
      };
      result.push( /*#__PURE__*/React.cloneElement(child, newProps, child.props.children));
    }

    const lastChild = children[children.length - 1];
    const lastChildProps = { ...lastChild.props.children,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    };
    result.push( /*#__PURE__*/React.cloneElement(lastChild, lastChildProps, lastChild.props.children));
    return result;
  }

  return React.Children.map(children, child => {
    return /*#__PURE__*/React.cloneElement(child, props, child.props.children);
  });
};

export const InputGroup = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const [layoutProps, nonLayoutProps] = extractInObject(props, [...stylingProps.margin, ...stylingProps.border, ...stylingProps.layout, ...stylingProps.flexbox, ...stylingProps.position, ...stylingProps.background, 'space', 'shadow', 'opacity']); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(HStack, _extends({}, layoutProps, {
    ref: ref
  }), supplyPropsToChildren(getAttachedChildren(children), nonLayoutProps));
}));
//# sourceMappingURL=InputGroup.js.map