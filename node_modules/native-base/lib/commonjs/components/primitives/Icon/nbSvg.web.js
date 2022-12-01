"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rect = exports.Circle = exports.Line = exports.Polygon = exports.Path = exports.G = exports.Svg = void 0;

var _reactNativeWeb = require("react-native-web");

var _react = require("react");

//@ts-ignore
const Svg = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('svg', { ...props,
  ref
}));
exports.Svg = Svg;
const G = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('g', { ...props,
  ref
}));
exports.G = G;
const Path = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('path', { ...props,
  ref
}));
exports.Path = Path;
const Polygon = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('polygon', { ...props,
  ref
}));
exports.Polygon = Polygon;
const Line = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('line', { ...props,
  ref
}));
exports.Line = Line;
const Circle = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('circle', { ...props,
  ref
}));
exports.Circle = Circle;
const Rect = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => (0, _reactNativeWeb.unstable_createElement)('rect', { ...props,
  ref
}));
exports.Rect = Rect;
//# sourceMappingURL=nbSvg.web.js.map