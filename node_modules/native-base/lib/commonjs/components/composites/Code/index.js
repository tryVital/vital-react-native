"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Code = ({ ...props
}, ref) => {
  let { ...newProps
  } = (0, _hooks.useThemeProps)('Code', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    _text: {
      fontFamily: _reactNative.Platform.OS === 'ios' ? 'Courier' : 'monospace'
    }
  }, newProps, {
    ref: ref
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Code));

exports.default = _default;
//# sourceMappingURL=index.js.map