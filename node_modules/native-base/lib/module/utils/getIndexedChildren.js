import React from 'react';

const getIndexedChildren = (children, startingIndex) => {
  let counter = startingIndex ? startingIndex - 1 : -1;
  const indexedChildren = React.Children.map(children, child => {
    counter++;
    return /*#__PURE__*/React.cloneElement(child, {
      index: counter
    }, child.props.children);
  });
  return indexedChildren;
};

export default getIndexedChildren;
//# sourceMappingURL=getIndexedChildren.js.map