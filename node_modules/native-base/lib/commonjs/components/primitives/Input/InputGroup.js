"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../../../utils");

var _Stack = require("../Stack");

var _utils2 = require("../../../theme/tools/utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const supplyPropsToChildren = (children, props) => {
  if (children.length >= 2) {
    const result = [];
    const firstChild = children[0];
    const firstChildProps = { ...firstChild.props.children,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    };
    result.push( /*#__PURE__*/_react.default.cloneElement(firstChild, firstChildProps, firstChild.props.children));

    for (let i = 1; i < children.length - 1; i++) {
      const child = children[i];
      const newProps = { ...props,
        borderRadius: '0'
      };
      result.push( /*#__PURE__*/_react.default.cloneElement(child, newProps, child.props.children));
    }

    const lastChild = children[children.length - 1];
    const lastChildProps = { ...lastChild.props.children,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    };
    result.push( /*#__PURE__*/_react.default.cloneElement(lastChild, lastChildProps, lastChild.props.children));
    return result;
  }

  return _react.default.Children.map(children, child => {
    return /*#__PURE__*/_react.default.cloneElement(child, props, child.props.children);
  });
};

const InputGroup = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(({
  children,
  ...props
}, ref) => {
  const [layoutProps, nonLayoutProps] = (0, _utils2.extractInObject)(props, [..._utils2.stylingProps.margin, ..._utils2.stylingProps.border, ..._utils2.stylingProps.layout, ..._utils2.stylingProps.flexbox, ..._utils2.stylingProps.position, ..._utils2.stylingProps.background, 'space', 'shadow', 'opacity']); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Stack.HStack, _extends({}, layoutProps, {
    ref: ref
  }), supplyPropsToChildren((0, _utils.getAttachedChildren)(children), nonLayoutProps));
}));
exports.InputGroup = InputGroup;
//# sourceMappingURL=InputGroup.js.map