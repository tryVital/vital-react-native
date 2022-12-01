function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useStyledSystemPropsResolver } from '../hooks/';
export const makeStyledComponent = Comp => {
  return /*#__PURE__*/React.forwardRef(({
    debug,
    ...props
  }, ref) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);

    if (process.env.NODE_ENV === 'development' && debug) {
      /* eslint-disable-next-line */
      console.log("%cstyleSystem", 'background: #4b5563; color: #d97706; font-weight: 700; padding: 2px 8px;');
      /* eslint-disable-next-line */

      console.log('%c props: ', 'color: #4ade80; font-weight: 700;', props);
      /* eslint-disable-next-line */

      console.log('%c style: ', 'color: #22d3ee; font-weight: 700;', style);
      /* eslint-disable-next-line */

      console.log('%c restProps: ', 'color: #22d3ee; font-weight: 700;', restProps);
    }

    return /*#__PURE__*/React.createElement(Comp, _extends({}, restProps, {
      style: style,
      ref: ref
    }), props.children);
  });
};
//# sourceMappingURL=styled.js.map