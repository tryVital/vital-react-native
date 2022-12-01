"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../components/primitives/Box"));

var _ResponsiveQueryProvider = require("./useResponsiveQuery/ResponsiveQueryProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flattenChildren(children, keys = []) {
  const childrenArray = _react.default.Children.toArray(children);

  return childrenArray.reduce((flatChildren, child, index) => {
    if (child.type === _react.default.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children, keys.concat(child.key || index)));
    }

    if ( /*#__PURE__*/_react.default.isValidElement(child)) {
      flatChildren.push( /*#__PURE__*/_react.default.cloneElement(child, {
        key: keys.concat(String(child.key || index)).join('.')
      }));
    } else {
      flatChildren.push(child);
    }

    return flatChildren;
  }, []);
}

const getSpacedChildren = (children, space, axis, reverse, divider) => {
  let childrenArray = _react.default.Children.toArray(flattenChildren(children));

  childrenArray = reverse === 'reverse' ? [...childrenArray].reverse() : childrenArray;
  const orientation = axis === 'X' ? 'vertical' : 'horizontal'; // eslint-disable-next-line react-hooks/rules-of-hooks

  const responsiveQueryContext = _react.default.useContext(_ResponsiveQueryProvider.ResponsiveQueryContext);

  const disableCSSMediaQueries = responsiveQueryContext.disableCSSMediaQueries; // If there's a divider, we wrap it with a Box and apply vertical and horizontal margins else we add a spacer Box with height or width

  if (divider) {
    const spacingProp = { ...(axis === 'X' ? {
        mx: space
      } : {
        my: space
      })
    };
    divider = /*#__PURE__*/_react.default.cloneElement(divider, {
      orientation,
      ...spacingProp
    });
    childrenArray = childrenArray.map((child, index) => {
      var _child$key;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
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

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: (_child$key2 = child.key) !== null && _child$key2 !== void 0 ? _child$key2 : "spaced-child-".concat(index)
      }, child, disableCSSMediaQueries ? index < childrenArray.length - 1 && /*#__PURE__*/_react.default.createElement(_Box.default, spacingProp) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null));
    });
  }

  return childrenArray;
};

var _default = getSpacedChildren;
exports.default = _default;
//# sourceMappingURL=getSpacedChildren.js.map