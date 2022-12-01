"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAbsoluteChildren = (children, reverse) => {
  let childrenArray = _react.default.Children.toArray(children);

  if (reverse) {
    childrenArray = childrenArray.reverse();
  }
  /*
  | Add the position to the children
  */


  const trailingChildrenWithSpacing = childrenArray.map(child => {
    return /*#__PURE__*/_react.default.cloneElement(child, _reactNative.Platform.OS === 'web' ? {
      style: {
        position: 'absolute'
      }
    } : {
      position: 'absolute'
    }, child.props.children);
  });
  /*
  | New children array with applied margin to trailing children
  */

  return [trailingChildrenWithSpacing];
};

var _default = getAbsoluteChildren;
exports.default = _default;
//# sourceMappingURL=getAbsoluteChildren.js.map