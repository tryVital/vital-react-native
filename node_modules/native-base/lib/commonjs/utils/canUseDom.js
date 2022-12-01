"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDom = canUseDom;

var _reactNative = require("react-native");

function canUseDom() {
  if (typeof window !== 'undefined' || _reactNative.Platform.OS !== 'web') {
    return true;
  }

  return false;
}
//# sourceMappingURL=canUseDom.js.map