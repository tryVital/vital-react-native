"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useResponsiveQuery: true,
  ResponsiveQueryProvider: true
};
Object.defineProperty(exports, "useResponsiveQuery", {
  enumerable: true,
  get: function () {
    return _useResponsiveQuery.useResponsiveQuery;
  }
});
Object.defineProperty(exports, "ResponsiveQueryProvider", {
  enumerable: true,
  get: function () {
    return _ResponsiveQueryProvider.ResponsiveQueryProvider;
  }
});

var _useResponsiveQuery = require("./useResponsiveQuery");

var _ResponsiveQueryProvider = require("./ResponsiveQueryProvider");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
//# sourceMappingURL=index.js.map