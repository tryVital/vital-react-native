import React from 'react';
import Text from '../components/primitives/Text';
export const addTextAndPropsToStrings = (children, props) => {
  const childArray = React.Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/React.createElement(Text, props, child);
    } else {
      if (!child) {
        return null;
      }

      return /*#__PURE__*/React.cloneElement(child, { ...props,
        ...child.props
      });
    }
  });
  return childArray;
};
//# sourceMappingURL=addTextAndPropsToStrings.js.map