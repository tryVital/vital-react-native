"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _theme = require("../../../theme");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Spinner = (props, ref) => {
  const {
    color,
    size,
    style,
    testID,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Spinner', props);
  const resolvedColor = (0, _theme.getColor)(color, (0, _hooks.useTheme)().colors, (0, _hooks.useTheme)());
  const resolvedStyle = (0, _hooks.useStyledSystemPropsResolver)(resolvedProps); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    testID: testID,
    accessible: true,
    accessibilityLabel: "loading",
    color: resolvedColor,
    ref: ref,
    size: size,
    style: [resolvedStyle, style]
  });
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Spinner));

exports.default = _default;
//# sourceMappingURL=index.js.map