function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import isNil from 'lodash.isnil';
import React from 'react';
import Flex from '../../primitives/Flex';
import { useThemeProps } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Wrap = ({
  children,
  ...props
}, ref) => {
  const {
    space,
    ...newProps
  } = useThemeProps('Wrap', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Flex, _extends({
    wrap: "wrap"
  }, newProps, {
    ref: ref
  }), isNil(space) ? children : React.Children.map(children, child => {
    return /*#__PURE__*/React.cloneElement(child, { ...props,
      style: {
        margin: space
      }
    }, child.props.children);
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Wrap));
//# sourceMappingURL=index.js.map