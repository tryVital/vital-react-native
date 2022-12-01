"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Stack = require("../Stack");

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const UnorderedList = ({
  children,
  ...props
}, ref) => {
  const {
    _text,
    _hover,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('List', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  } // add props to children


  children = _react.default.Children.map(children, (child, ind) => {
    return /*#__PURE__*/_react.default.cloneElement(child, {
      index: ind,
      ul: true,
      _text: _text,
      _hover,
      ...child.props
    }, child.props.children);
  });
  return /*#__PURE__*/_react.default.createElement(_Stack.VStack, _extends({}, resolvedProps, {
    ref: ref
  }), children);
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(UnorderedList));

exports.default = _default;
//# sourceMappingURL=Unordered.js.map