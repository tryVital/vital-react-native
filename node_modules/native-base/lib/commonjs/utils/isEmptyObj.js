"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyObj = isEmptyObj;

function isEmptyObj(obj) {
  for (var _x in obj) {
    return false;
  }

  return true;
}
//# sourceMappingURL=isEmptyObj.js.map