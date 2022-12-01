function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Box, Image } from '../../primitives';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import isNil from 'lodash.isnil';
import has from 'lodash.has';

const Avatar = ({
  children,
  ...props
}, ref) => {
  const [error, setError] = React.useState(false);
  const {
    _image,
    _badgeSize,
    source,
    ...resolvedProps
  } = usePropsResolution('Avatar', props);
  let Badge = /*#__PURE__*/React.createElement(React.Fragment, null);
  const remainingChildren = []; //  Pop Badge from children

  React.Children.map(children, child => {
    if (typeof (child === null || child === void 0 ? void 0 : child.type) === 'object' && (child === null || child === void 0 ? void 0 : child.type.displayName) === 'AvatarBadge') {
      var _child$props, _child$props2;

      Badge = /*#__PURE__*/React.cloneElement(child, {
        size: child !== null && child !== void 0 && (_child$props = child.props) !== null && _child$props !== void 0 && _child$props.size ? child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.size : _badgeSize ? _badgeSize[0] : undefined
      });
    } else {
      remainingChildren.push(child);
    }
  }); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  const getSource = () => {
    if (source) {
      if (has(source, 'uri') && !isNil(source.uri)) {
        return source;
      } else if (!has(source, 'uri')) {
        return source;
      }
    }

    return null;
  };

  const imageSource = getSource();
  return /*#__PURE__*/React.createElement(Box, resolvedProps, imageSource && !error ? /*#__PURE__*/React.createElement(Image, _extends({
    source: source,
    onError: () => {
      setError(true);
    }
  }, _image, {
    ref: ref
  })) : remainingChildren.length !== 0 && remainingChildren, Badge);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Avatar));
//# sourceMappingURL=Avatar.js.map