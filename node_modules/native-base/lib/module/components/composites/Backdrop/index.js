function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import { Pressable } from '../../primitives/Pressable';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Backdrop = props => {
  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Pressable, _extends({
    _web: {
      //@ts-ignore
      cursor: 'default'
    },
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    accessible: false,
    importantForAccessibility: "no",
    bg: props.bg || 'rgb(0, 0, 0)',
    opacity: 0.3
  }, props));
};

export default /*#__PURE__*/memo(Backdrop);
//# sourceMappingURL=index.js.map