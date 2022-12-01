"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../../hooks");

var _SVGIcon = _interopRequireDefault(require("./SVGIcon"));

var _factory = require("../../../factory");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Icon = (props, ref) => {
  const {
    as,
    size,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Icon', props);
  const tokenizedFontSize = (0, _hooks.useToken)('space', size); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if (!as) {
    return /*#__PURE__*/_react.default.createElement(_SVGIcon.default, _extends({
      size: size
    }, resolvedProps, {
      ref: ref
    }));
  }

  const isJSX = /*#__PURE__*/_react.default.isValidElement(as);

  const StyledAs = (0, _factory.Factory)(isJSX ? resolvedProps => /*#__PURE__*/_react.default.cloneElement(as, { ...resolvedProps,
    //@ts-ignore
    ...as.props
  }) : as);
  return /*#__PURE__*/_react.default.createElement(StyledAs, _extends({}, resolvedProps, {
    fontSize: tokenizedFontSize,
    lineHeight: tokenizedFontSize,
    size: size,
    ref: ref
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Icon));

exports.default = _default;
//# sourceMappingURL=Icon.js.map