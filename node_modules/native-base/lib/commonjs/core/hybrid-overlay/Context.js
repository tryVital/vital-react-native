"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HybridContext = void 0;

var _react = require("react");

const HybridContext = /*#__PURE__*/(0, _react.createContext)({
  colorMode: {
    colorMode: 'light',
    toggleColorMode: () => {},
    setColorMode: () => {},
    accessibleColors: false,
    setAccessibleColors: () => {}
  }
});
exports.HybridContext = HybridContext;
//# sourceMappingURL=Context.js.map