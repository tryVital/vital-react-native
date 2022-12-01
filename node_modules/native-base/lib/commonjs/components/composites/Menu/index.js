"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var _Menu = _interopRequireDefault(require("./Menu"));

var _MenuGroup = _interopRequireDefault(require("./MenuGroup"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuItemOption = _interopRequireDefault(require("./MenuItemOption"));

var _MenuOptionGroup = _interopRequireDefault(require("./MenuOptionGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let MenuTemp = _Menu.default;
MenuTemp.Item = _MenuItem.default;
MenuTemp.Group = _MenuGroup.default;
MenuTemp.ItemOption = _MenuItemOption.default;
MenuTemp.OptionGroup = _MenuOptionGroup.default; // To add typings

const Menu = MenuTemp;
exports.Menu = Menu;
//# sourceMappingURL=index.js.map