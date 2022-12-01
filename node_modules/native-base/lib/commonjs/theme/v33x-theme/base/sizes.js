"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _space = require("./space");

const container = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};
const sizes = { ..._space.spacing,
  ...{
    '3xs': 224,
    '2xs': 256,
    'xs': 320,
    'sm': 384,
    'md': 448,
    'lg': 512,
    'xl': 576,
    '2xl': 672
  },
  container
};
var _default = sizes;
exports.default = _default;
//# sourceMappingURL=sizes.js.map