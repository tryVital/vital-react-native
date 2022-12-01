"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = require("../../primitives/Button");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _overlays = require("@react-native-aria/overlays");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _utils = require("../../../theme/tools/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Fab = ({ ...props
}, ref) => {
  /** Extracting Button Specific Props */
  const [buttonProps, remainingProps] = (0, _utils.extractInObject)(props, ['variant', '_pressed', '_hover', '_text', '_focus', '_stack', '_loading', '_disabled', '_spinner']);
  const themeProps = (0, _useThemeProps.usePropsResolution)('FAB', remainingProps);
  const {
    label,
    icon,
    renderInPortal,
    placement,
    placementProps,
    ...newProps
  } = themeProps;

  const fabComponent = /*#__PURE__*/_react.default.createElement(_Button.Button, _extends({}, buttonProps, placementProps[placement], {
    ref: ref,
    startIcon: icon
  }, newProps), label); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return renderInPortal ? /*#__PURE__*/_react.default.createElement(_overlays.OverlayContainer, null, fabComponent) : fabComponent;
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Fab));

exports.default = _default;
//# sourceMappingURL=Fab.js.map