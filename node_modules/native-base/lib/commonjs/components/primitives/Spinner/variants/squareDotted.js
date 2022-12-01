"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SquareDotted = SquareDotted;

var _react = _interopRequireDefault(require("react"));

var _Icon = require("../../../primitives/Icon");

var _reactNativeSvg = require("react-native-svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SquareDotted(props) {
  return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    color: props.color,
    viewBox: "0 0 50 50",
    size: props.size
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.G, {
    id: "Group_264",
    "data-name": "Group 264",
    transform: "translate(-172 -330)"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    id: "Ellipse_33",
    "data-name": "Ellipse 33",
    cx: "9",
    cy: "9",
    r: "9",
    transform: "translate(172 330)",
    fill: props.color
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    id: "Ellipse_36",
    "data-name": "Ellipse 36",
    cx: "9",
    cy: "9",
    r: "9",
    transform: "translate(204 330)",
    fill: props.color
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    id: "Ellipse_35",
    "data-name": "Ellipse 35",
    cx: "9",
    cy: "9",
    r: "9",
    transform: "translate(172 362)",
    fill: props.color
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    id: "Ellipse_37",
    "data-name": "Ellipse 37",
    cx: "9",
    cy: "9",
    r: "9",
    transform: "translate(204 362)",
    fill: props.color
  })));
}
//# sourceMappingURL=squareDotted.js.map