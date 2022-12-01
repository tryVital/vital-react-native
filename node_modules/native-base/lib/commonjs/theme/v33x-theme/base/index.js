"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.themePropertyMap = void 0;

var _borders = _interopRequireDefault(require("./borders"));

var _breakpoints = _interopRequireDefault(require("./breakpoints"));

var _colors = _interopRequireDefault(require("./colors"));

var _radius = _interopRequireDefault(require("./radius"));

var _shadows = _interopRequireDefault(require("./shadows"));

var _sizes = _interopRequireDefault(require("./sizes"));

var _space = require("./space");

var _typography = _interopRequireDefault(require("./typography"));

var _opacity = _interopRequireDefault(require("./opacity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const theme = {
  borderWidths: _borders.default,
  breakpoints: _breakpoints.default,
  colors: _colors.default,
  radii: _radius.default,
  ..._typography.default,
  sizes: _sizes.default,
  space: _space.spacing,
  shadows: _shadows.default,
  opacity: _opacity.default
};
const themePropertyMap = {
  borderRadius: 'radii',
  color: 'colors',
  letterSpacing: 'letterSpacings',
  lineHeight: 'lineHeights',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  size: 'sizes',
  space: 'space',
  border: 'borders',
  shadow: 'shadows'
};
exports.themePropertyMap = themePropertyMap;
var _default = theme;
exports.default = _default;
//# sourceMappingURL=index.js.map