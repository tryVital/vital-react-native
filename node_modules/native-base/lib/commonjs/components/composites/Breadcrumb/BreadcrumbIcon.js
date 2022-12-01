"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Icon = require("../../primitives/Icon");

var _Context = require("./Context");

var _usePropsResolution = require("../../../hooks/useThemeProps/usePropsResolution");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Add breadcrumbIcon as child of breadcrumbItem for implementaion of isCurrent prop
const BreadcrumbIcon = (props, ref) => {
  const {
    isCurrent
  } = _react.default.useContext(_Context.BreadcrumbItemContext);

  let {
    children,
    _current,
    ...resolvedProps
  } = (0, _usePropsResolution.usePropsResolution)('BreadcrumbIcon', props);
  return /*#__PURE__*/_react.default.createElement(_Icon.Icon, _extends({
    ref: ref
  }, isCurrent && _current, resolvedProps), children);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(BreadcrumbIcon));

exports.default = _default;
//# sourceMappingURL=BreadcrumbIcon.js.map