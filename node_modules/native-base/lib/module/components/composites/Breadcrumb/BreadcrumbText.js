function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import Text from '../../primitives/Text';
import { BreadcrumbItemContext } from './Context';
import { usePropsResolution } from '../../../hooks/useThemeProps/usePropsResolution'; // Add breadcrumbText as child of breadcrumbItem for implementaion of isCurrent prop

const BreadcrumbText = (props, ref) => {
  const {
    isCurrent
  } = React.useContext(BreadcrumbItemContext);
  let {
    children,
    _current,
    ...resolvedProps
  } = usePropsResolution('BreadcrumbText', props);
  return /*#__PURE__*/React.createElement(Text, _extends({
    ref: ref
  }, isCurrent && _current, resolvedProps), children);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(BreadcrumbText));
//# sourceMappingURL=BreadcrumbText.js.map