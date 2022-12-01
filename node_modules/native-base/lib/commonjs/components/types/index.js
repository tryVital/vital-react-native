"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ExtraProps = require("./ExtraProps");

Object.keys(_ExtraProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtraProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ExtraProps[key];
    }
  });
});

var _PlatformProps = require("./PlatformProps");

Object.keys(_PlatformProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PlatformProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PlatformProps[key];
    }
  });
});

var _responsiveValue = require("./responsiveValue");

Object.keys(_responsiveValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _responsiveValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _responsiveValue[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
//# sourceMappingURL=index.js.map