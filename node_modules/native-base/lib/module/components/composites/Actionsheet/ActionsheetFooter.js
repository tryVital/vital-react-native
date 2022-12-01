function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Modal } from '../../composites/Modal';
import { usePropsResolution } from '../../../hooks';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const ActionsheetFooter = (props, ref) => {
  const resolvedProps = usePropsResolution('ActionsheetFooter', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Modal.Content, _extends({}, resolvedProps, {
    ref: ref
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(ActionsheetFooter));
//# sourceMappingURL=ActionsheetFooter.js.map