"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _primitives = require("../../primitives");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Progress = (props, ref) => {
  const {
    min,
    max,
    value,
    _filledTrack,
    children,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Progress', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  let valueWidth = value < max && value > min ? (value - min) / (max - min) * 100 : value > min ? 100 : 0;
  return /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({}, resolvedProps, {
    ref: ref,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityValue: {
      min: min,
      max: max,
      now: valueWidth
    }
  }), /*#__PURE__*/_react.default.createElement(_primitives.Box, _extends({
    w: "".concat(valueWidth, "%")
  }, _filledTrack), children));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Progress));

exports.default = _default;
//# sourceMappingURL=index.js.map