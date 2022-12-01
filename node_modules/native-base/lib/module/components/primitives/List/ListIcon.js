function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Icon } from '../Icon';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ListIcon = (props, ref) => {
  const resolvedProps = usePropsResolution('ListIcon', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Icon, _extends({}, resolvedProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(ListIcon));
//# sourceMappingURL=ListIcon.js.map