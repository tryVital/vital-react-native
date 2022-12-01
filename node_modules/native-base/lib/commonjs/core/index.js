"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useColorMode: true,
  useColorModeValue: true,
  useAccessibleColors: true,
  ToastProvider: true
};
Object.defineProperty(exports, "useColorMode", {
  enumerable: true,
  get: function () {
    return _colorMode.useColorMode;
  }
});
Object.defineProperty(exports, "useColorModeValue", {
  enumerable: true,
  get: function () {
    return _colorMode.useColorModeValue;
  }
});
Object.defineProperty(exports, "useAccessibleColors", {
  enumerable: true,
  get: function () {
    return _colorMode.useAccessibleColors;
  }
});
Object.defineProperty(exports, "ToastProvider", {
  enumerable: true,
  get: function () {
    return _Toast.ToastProvider;
  }
});

var _NativeBaseProvider = require("./NativeBaseProvider");

Object.keys(_NativeBaseProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NativeBaseProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NativeBaseProvider[key];
    }
  });
});

var _extendTheme = require("./extendTheme");

Object.keys(_extendTheme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _extendTheme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extendTheme[key];
    }
  });
});

var _colorMode = require("./color-mode");

var _Toast = require("../components/composites/Toast");
//# sourceMappingURL=index.js.map