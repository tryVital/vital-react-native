"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SelectItem = _interopRequireDefault(require("./SelectItem"));

var _Select = _interopRequireDefault(require("./Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const SelectTemp: any = SelectMain;
const SelectTemp = _Select.default;
SelectTemp.Item = _SelectItem.default;
const Select = SelectTemp;
var _default = Select;
exports.default = _default;
//# sourceMappingURL=index.js.map