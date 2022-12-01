"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PresenceTransition = _interopRequireDefault(require("../Transitions/PresenceTransition"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _hooks = require("../../../hooks/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Fade = ({
  children,
  ...props
}, ref) => {
  const {
    in: animationState,
    entryDuration,
    exitDuration,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Fade', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if (entryDuration) {
    resolvedProps.animate.transition.duration = entryDuration;
  }

  if (exitDuration) {
    resolvedProps.exit.transition.duration = exitDuration;
  }

  return /*#__PURE__*/_react.default.createElement(_PresenceTransition.default, _extends({
    visible: animationState,
    ref: ref
  }, resolvedProps), children);
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Fade));

exports.default = _default;
//# sourceMappingURL=Fade.js.map