"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPrefixer = _interopRequireDefault(require("inline-style-prefixer/lib/createPrefixer"));

var _staticData = _interopRequireDefault(require("./staticData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
//@ts-nocheck
// This functions is taken from react native web
const prefixAll = (0, _createPrefixer.default)(_staticData.default);
var _default = prefixAll;
exports.default = _default;
//# sourceMappingURL=prefixStyles.js.map