import React from 'react';

const getAttachedChildren = children => {
  const childrenArray = React.Children.toArray(children);
  /*
  | Separate the trailing (not first) children from the children array
  */

  if (childrenArray.length <= 1) {
    return childrenArray;
  }

  const trailingChildren = childrenArray.slice(1);
  trailingChildren.pop();
  const marginProp = { ...{
      ml: 0,
      mr: 0,
      roundedRight: 0,
      roundedLeft: 0
    }
  };
  const leftElemProp = { ...{
      mr: 0,
      roundedRight: 0
    }
  };
  const rightElemProp = { ...{
      ml: 0,
      roundedLeft: 0
    }
  };
  /*
  | Add the margiin to the children
  */

  const trailingChildrenWithSpacing = trailingChildren.map(child => {
    return /*#__PURE__*/React.cloneElement(child, marginProp, child.props.children);
  });
  /*
  | New children array with applied margin to trailing children
  */

  return [/*#__PURE__*/React.cloneElement(childrenArray[0], leftElemProp, childrenArray[0].props.children), ...trailingChildrenWithSpacing, /*#__PURE__*/React.cloneElement(childrenArray[childrenArray.length - 1], rightElemProp, childrenArray[childrenArray.length - 1].props.children)];
};

export default getAttachedChildren;
//# sourceMappingURL=getAttachedChildren.js.map