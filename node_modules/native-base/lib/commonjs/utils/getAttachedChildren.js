"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAttachedChildren = children => {
  const childrenArray = _react.default.Children.toArray(children);
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
    return /*#__PURE__*/_react.default.cloneElement(child, marginProp, child.props.children);
  });
  /*
  | New children array with applied margin to trailing children
  */

  return [/*#__PURE__*/_react.default.cloneElement(childrenArray[0], leftElemProp, childrenArray[0].props.children), ...trailingChildrenWithSpacing, /*#__PURE__*/_react.default.cloneElement(childrenArray[childrenArray.length - 1], rightElemProp, childrenArray[childrenArray.length - 1].props.children)];
};

var _default = getAttachedChildren;
exports.default = _default;
//# sourceMappingURL=getAttachedChildren.js.map