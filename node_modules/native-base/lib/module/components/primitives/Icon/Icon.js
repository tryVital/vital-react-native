function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { useToken, usePropsResolution } from '../../../hooks';
import SVGIcon from './SVGIcon';
import { Factory } from '../../../factory';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Icon = (props, ref) => {
  const {
    as,
    size,
    ...resolvedProps
  } = usePropsResolution('Icon', props);
  const tokenizedFontSize = useToken('space', size); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (!as) {
    return /*#__PURE__*/React.createElement(SVGIcon, _extends({
      size: size
    }, resolvedProps, {
      ref: ref
    }));
  }

  const isJSX = /*#__PURE__*/React.isValidElement(as);
  const StyledAs = Factory(isJSX ? resolvedProps => /*#__PURE__*/React.cloneElement(as, { ...resolvedProps,
    //@ts-ignore
    ...as.props
  }) : as);
  return /*#__PURE__*/React.createElement(StyledAs, _extends({}, resolvedProps, {
    fontSize: tokenizedFontSize,
    lineHeight: tokenizedFontSize,
    size: size,
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Icon));
//# sourceMappingURL=Icon.js.map