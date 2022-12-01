"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Context = require("./Context");

var _Box = _interopRequireDefault(require("../Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SliderFilledTrack = (props, ref) => {
  const {
    isReversed,
    colorScheme,
    state,
    trackLayout,
    orientation,
    isDisabled,
    sliderSize,
    isReadOnly
  } = _react.default.useContext(_Context.SliderContext);

  const sliderTrackPosition = isReversed ? orientation === 'vertical' ? trackLayout.height - trackLayout.height * state.getThumbPercent(0) : trackLayout.width - trackLayout.width * state.getThumbPercent(0) : state.getThumbPercent(0) * 100 + '%';
  const resolvedProps = (0, _useThemeProps.usePropsResolution)('SliderFilledTrack', {
    size: sliderSize,
    colorScheme,
    isReversed,
    orientation,
    sliderTrackPosition,
    ...props
  }, {
    isDisabled,
    isReadOnly
  }); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    position: "absolute"
  }, resolvedProps, {
    ref: ref // {...(isReadOnly && _readOnly)}
    // {...(isDisabled && _disabled)}

  }));
};

var _default = /*#__PURE__*/_react.default.forwardRef(SliderFilledTrack);

exports.default = _default;
//# sourceMappingURL=SliderFilledTrack.js.map