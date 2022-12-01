"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Spacer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Flex = (props, ref) => {
  const {
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    direction,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Flex', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
    flexDirection: direction || resolvedProps.flexDirection,
    alignItems: align || resolvedProps.alignItems,
    justifyContent: justify || resolvedProps.justifyContent,
    flexGrow: grow || resolvedProps.flexGrow,
    flexBasis: basis || resolvedProps.flexBasis,
    flexShrink: shrink || resolvedProps.flexShrink,
    flexWrap: wrap || resolvedProps.flexWrap,
    ref: ref
  }));
}; //Spacer Component that adds space between components where it is placed


const Spacer = props => {
  const resolvedProps = (0, _useThemeProps.usePropsResolution)('Spacer', props);
  return /*#__PURE__*/_react.default.createElement(_Box.default, resolvedProps);
};

exports.Spacer = Spacer;

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Flex));

exports.default = _default;
//# sourceMappingURL=index.js.map