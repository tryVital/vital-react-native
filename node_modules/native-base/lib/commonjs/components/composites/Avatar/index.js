"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _Badge = _interopRequireDefault(require("./Badge"));

var _Group = _interopRequireDefault(require("./Group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AvatarTemp = _Avatar.default;
AvatarTemp.Badge = _Badge.default;
AvatarTemp.Group = _Group.default; // To add typings

const Avatar = AvatarTemp;
exports.Avatar = Avatar;
//# sourceMappingURL=index.js.map