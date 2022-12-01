"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _List = _interopRequireDefault(require("./List"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _ListIcon = _interopRequireDefault(require("./ListIcon"));

var _Ordered = _interopRequireDefault(require("./Ordered"));

var _Unordered = _interopRequireDefault(require("./Unordered"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListTemp = _List.default;
ListTemp.Item = _ListItem.default;
ListTemp.Icon = _ListIcon.default;
ListTemp.Ordered = _Ordered.default;
ListTemp.Unordered = _Unordered.default; // To add typings

const List = ListTemp;
exports.List = List;
//# sourceMappingURL=index.js.map