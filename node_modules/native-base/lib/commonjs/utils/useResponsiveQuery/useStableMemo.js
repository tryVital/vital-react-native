"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStableMemo = useStableMemo;

var _react = require("react");

var _stableHash = _interopRequireDefault(require("stable-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//@ts-ignore
function useStableMemo(factory, deps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (0, _react.useMemo)(factory, [(0, _stableHash.default)(deps)]);
}
//# sourceMappingURL=useStableMemo.js.map