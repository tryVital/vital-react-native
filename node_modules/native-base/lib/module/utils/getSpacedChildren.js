import React from 'react';
import { default as Box } from '../components/primitives/Box';
import { ResponsiveQueryContext } from './useResponsiveQuery/ResponsiveQueryProvider';

function flattenChildren(children, keys = []) {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.reduce((flatChildren, child, index) => {
    if (child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children, keys.concat(child.key || index)));
    }

    if ( /*#__PURE__*/React.isValidElement(child)) {
      flatChildren.push( /*#__PURE__*/React.cloneElement(child, {
        key: keys.concat(String(child.key || index)).join('.')
      }));
    } else {
      flatChildren.push(child);
    }

    return flatChildren;
  }, []);
}

const getSpacedChildren = (children, space, axis, reverse, divider) => {
  let childrenArray = React.Children.toArray(flattenChildren(children));
  childrenArray = reverse === 'reverse' ? [...childrenArray].reverse() : childrenArray;
  const orientation = axis === 'X' ? 'vertical' : 'horizontal'; // eslint-disable-next-line react-hooks/rules-of-hooks

  const responsiveQueryContext = React.useContext(ResponsiveQueryContext);
  const disableCSSMediaQueries = responsiveQueryContext.disableCSSMediaQueries; // If there's a divider, we wrap it with a Box and apply vertical and horizontal margins else we add a spacer Box with height or width

  if (divider) {
    const spacingProp = { ...(axis === 'X' ? {
        mx: space
      } : {
        my: space
      })
    };
    divider = /*#__PURE__*/React.cloneElement(divider, {
      orientation,
      ...spacingProp
    });
    childrenArray = childrenArray.map((child, index) => {
      var _child$key;

      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: (_child$key = child.key) !== null && _child$key !== void 0 ? _child$key : "spaced-child-".concat(index)
      }, child, index < childrenArray.length - 1 && divider);
    });
  } else {
    const spacingProp = { ...(axis === 'X' ? {
        width: space
      } : {
        height: space
      })
    };
    childrenArray = childrenArray.map((child, index) => {
      var _child$key2;

      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: (_child$key2 = child.key) !== null && _child$key2 !== void 0 ? _child$key2 : "spaced-child-".concat(index)
      }, child, disableCSSMediaQueries ? index < childrenArray.length - 1 && /*#__PURE__*/React.createElement(Box, spacingProp) : /*#__PURE__*/React.createElement(React.Fragment, null));
    });
  }

  return childrenArray;
};

export default getSpacedChildren;
//# sourceMappingURL=getSpacedChildren.js.map