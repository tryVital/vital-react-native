"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getIndexedChildren = (children, startingIndex) => {
  let counter = startingIndex ? startingIndex - 1 : -1;

  const indexedChildren = _react.default.Children.map(children, child => {
    counter++;
    return /*#__PURE__*/_react.default.cloneElement(child, {
      index: counter
    }, child.props.children);
  });

  return indexedChildren;
};

var _default = getIndexedChildren;
exports.default = _default;
//# sourceMappingURL=getIndexedChildren.js.map