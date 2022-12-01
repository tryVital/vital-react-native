"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _useThemeProps = require("../../../hooks/useThemeProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Square = props => {
  const resolvedProps = (0, _useThemeProps.usePropsResolution)('Square', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, resolvedProps);
};

var _default = /*#__PURE__*/_react.default.memo(Square);

exports.default = _default;
//# sourceMappingURL=Square.js.map