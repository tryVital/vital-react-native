"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require("./colors");

Object.keys(_colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _colors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colors[key];
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