function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import isNil from 'lodash.isnil';
import { default as Avatar } from './Avatar';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps'; // Todo: Try using HStack instead

const getAvatarGroupChildren = (children, space, max, _hiddenAvatarPlaceholder, _avatar, isVertical) => {
  let childrenArray = React.Children.toArray(children);
  let plusAvatars = 0;

  if (!isNil(max) && max < childrenArray.length && max > 0) {
    plusAvatars = childrenArray.length - max;
    childrenArray = childrenArray.slice(0, max);
  }

  const spacingProps = {
    ml: isVertical ? 0 : space,
    mt: isVertical ? space : 0
  };
  return [plusAvatars > 0 ? /*#__PURE__*/React.createElement(Avatar, _extends({
    key: "avatar-group-wrapper"
  }, spacingProps, _avatar, _hiddenAvatarPlaceholder), '+ ' + plusAvatars) : null, React.Children.map(childrenArray.reverse(), (child, index) => {
    return /*#__PURE__*/React.cloneElement(child, {
      key: "avatar-group-child-".concat(index),
      ..._avatar,
      ...spacingProps,
      ...child.props
    }, child.props.children);
  })];
};

const AvatarGroup = ({
  children,
  ...props
}, ref) => {
  const {
    max,
    _avatar,
    _hiddenAvatarPlaceholder,
    isVertical,
    space,
    ...resolvedProps
  } = usePropsResolution('AvatarGroup', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
    ref: ref
  }), getAvatarGroupChildren(children, space, max, _hiddenAvatarPlaceholder, _avatar, isVertical));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(AvatarGroup));
//# sourceMappingURL=Group.js.map