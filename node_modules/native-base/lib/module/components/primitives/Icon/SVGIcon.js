function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { useToken, usePropsResolution } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { Svg, G } from './nbSvg';
import { questionOutlineIconPath } from './Icons/questionIconPath';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const SVG = makeStyledComponent(Svg);

const SVGIcon = ({
  children,
  ...props
}, ref) => {
  const {
    focusable,
    stroke,
    color,
    size,
    ...resolvedProps
  } = usePropsResolution('Icon', props);
  const strokeHex = useToken('colors', stroke || '');
  const colorHex = useToken('colors', color || ''); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(SVG, _extends({}, resolvedProps, {
    // height={
    //   newProps.size
    //     ? parseInt(newProps.size, 10)
    //     : parseInt(newProps.height, 10)
    // }
    // width={
    //   newProps.size
    //     ? parseInt(newProps.size, 10)
    //     : parseInt(newProps.width, 10)
    // }
    size: size,
    color: colorHex,
    stroke: strokeHex,
    focusable: focusable,
    accessibilityRole: "image" // style={style}
    ,
    ref: ref
  }), React.Children.count(children) > 0 ? /*#__PURE__*/React.createElement(G, null, React.Children.map(children, (child, i) => {
    var _child$key;

    return /*#__PURE__*/React.createElement(ChildPath, _extends({
      key: (_child$key = child === null || child === void 0 ? void 0 : child.key) !== null && _child$key !== void 0 ? _child$key : i,
      element: child
    }, child === null || child === void 0 ? void 0 : child.props));
  })) : questionOutlineIconPath);
};

const ChildPath = ({
  element,
  fill,
  stroke: pathStroke
}) => {
  const pathStrokeColor = useToken('colors', pathStroke || '');
  const fillColor = useToken('colors', fill || '');

  if (!element) {
    return null;
  }

  return /*#__PURE__*/React.cloneElement(element, {
    fill: fillColor ? fillColor : 'currentColor',
    stroke: pathStrokeColor
  });
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(SVGIcon));
//# sourceMappingURL=SVGIcon.js.map