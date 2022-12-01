"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skeleton = void 0;

var _Skeleton = _interopRequireDefault(require("./Skeleton"));

var _SkeletonText = _interopRequireDefault(require("./SkeletonText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SkeletonTemp = _Skeleton.default;
SkeletonTemp.Text = _SkeletonText.default; // To add typings

const Skeleton = SkeletonTemp;
exports.Skeleton = Skeleton;
//# sourceMappingURL=index.js.map