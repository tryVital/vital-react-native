"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTextAndPropsToStrings = void 0;

var _react = _interopRequireDefault(require("react"));

var _Text = _interopRequireDefault(require("../components/primitives/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addTextAndPropsToStrings = (children, props) => {
  const childArray = _react.default.Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/_react.default.createElement(_Text.default, props, child);
    } else {
      if (!child) {
        return null;
      }

      return /*#__PURE__*/_react.default.cloneElement(child, { ...props,
        ...child.props
      });
    }
  });

  return childArray;
};

exports.addTextAndPropsToStrings = addTextAndPropsToStrings;
//# sourceMappingURL=addTextAndPropsToStrings.js.map