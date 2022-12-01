function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import SVGIcon from './SVGIcon';
import { Path } from './nbSvg';
import isEmpty from 'lodash.isempty';
export const createIcon = ({
  path,
  d,
  ...initialProps
}) => {
  const createdIcon = (props, ref) => {
    let children = path;

    if (d && (!path || isEmpty(path))) {
      children = /*#__PURE__*/React.createElement(Path, {
        fill: "currentColor",
        d: d
      });
    }

    return /*#__PURE__*/React.createElement(SVGIcon, _extends({
      children: children
    }, initialProps, props, {
      ref: ref
    }));
  };

  return /*#__PURE__*/memo( /*#__PURE__*/forwardRef(createdIcon));
};
//# sourceMappingURL=createIcon.js.map