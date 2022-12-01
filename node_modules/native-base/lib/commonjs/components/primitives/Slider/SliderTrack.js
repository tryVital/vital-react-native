"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Pressable = require("../Pressable");

var _Box = _interopRequireDefault(require("../Box"));

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SliderTrack = ({
  children,
  ...props
}, ref) => {
  const {
    orientation,
    trackProps,
    onTrackLayout,
    colorScheme,
    sliderSize,
    isReadOnly,
    isDisabled
  } = _react.default.useContext(_Context.SliderContext);

  const isVertical = orientation === 'vertical';
  const {
    _pressable,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('SliderTrack', {
    size: sliderSize,
    colorScheme,
    isVertical,
    ...props
  }, {
    isReadOnly,
    isDisabled
  }); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({
    onLayout: onTrackLayout,
    ref: ref
  }, trackProps, _pressable), /*#__PURE__*/_react.default.createElement(_Box.default, resolvedProps, children));
};

var _default = /*#__PURE__*/_react.default.forwardRef(SliderTrack);

exports.default = _default;
//# sourceMappingURL=SliderTrack.js.map