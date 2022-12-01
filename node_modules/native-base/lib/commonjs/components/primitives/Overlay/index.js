"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Overlay = require("./Overlay");

Object.keys(_Overlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Overlay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Overlay[key];
    }
  });
});
//# sourceMappingURL=index.js.map