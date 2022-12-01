"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Stack = require("../Stack");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(({
  children,
  divider,
  variant,
  ...props
}, ref) => {
  const {
    space,
    direction,
    size,
    colorScheme,
    isDisabled,
    isAttached,
    ...newProps
  } = (0, _useThemeProps.usePropsResolution)('ButtonGroup', props);
  const {
    borderRadius
  } = (0, _useThemeProps.usePropsResolution)('Button', props);
  let computedChildren;

  if (Array.isArray(children)) {
    computedChildren = _react.default.Children.toArray(children).map((child, index) => {
      if (typeof child === 'string' || typeof child === 'number') return child;
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "button-group-child-".concat(index),
        variant,
        size,
        colorScheme,
        isDisabled,
        // when buttons are attached, remove rounded corners of all buttons except extreme buttons
        ...(isAttached ? {
          borderRadius: 0
        } : {}),
        ...(isAttached && index === 0 ? direction === 'column' ? {
          borderTopRadius: borderRadius
        } : {
          borderLeftRadius: borderRadius
        } : {}),
        ...(isAttached && index === (children === null || children === void 0 ? void 0 : children.length) - 1 ? direction === 'column' ? {
          borderBottomRadius: borderRadius
        } : {
          borderRightRadius: borderRadius
        } : {}),
        //when buttons are attached, remove double border from them, just keep borderRight in case for direction row and borderBottom in case of direction column for every component
        ...(isAttached && index !== 0 ? direction === 'column' ? {
          borderTopWidth: 0
        } : {
          borderLeftWidth: 0
        } : {}),
        ...child.props
      });
    });
  } else {
    computedChildren = _react.default.Children.toArray(children).map((child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: "button-group-child-".concat(index),
        variant,
        size,
        colorScheme,
        isDisabled,
        ...child.props
      });
    });
  } //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({
    divider: divider,
    space: isAttached ? 0 : space,
    direction: direction
  }, newProps, {
    ref: ref
  }), computedChildren);
}));

exports.default = _default;
//# sourceMappingURL=ButtonGroup.js.map