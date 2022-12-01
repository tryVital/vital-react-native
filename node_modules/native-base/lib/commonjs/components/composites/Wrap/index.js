"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isnil"));

var _react = _interopRequireDefault(require("react"));

var _Flex = _interopRequireDefault(require("../../primitives/Flex"));

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Wrap = ({
  children,
  ...props
}, ref) => {
  const {
    space,
    ...newProps
  } = (0, _hooks.useThemeProps)('Wrap', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Flex.default, _extends({
    wrap: "wrap"
  }, newProps, {
    ref: ref
  }), (0, _lodash.default)(space) ? children : _react.default.Children.map(children, child => {
    return /*#__PURE__*/_react.default.cloneElement(child, { ...props,
      style: {
        margin: space
      }
    }, child.props.children);
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Wrap));

exports.default = _default;
//# sourceMappingURL=index.js.map