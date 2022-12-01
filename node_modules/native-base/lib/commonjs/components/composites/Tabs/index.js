"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TabsContext", {
  enumerable: true,
  get: function () {
    return _Context.TabsContext;
  }
});
exports.Tabs = void 0;

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _Context = require("./Context");

var _TabBar = _interopRequireDefault(require("./TabBar"));

var _Tab = _interopRequireDefault(require("./Tab"));

var _TabViews = _interopRequireDefault(require("./TabViews"));

var _TabView = _interopRequireDefault(require("./TabView"));

var _TabIcon = _interopRequireDefault(require("./TabIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TabsTemp = _Tabs.default;
TabsTemp.Bar = _TabBar.default;
TabsTemp.Tab = _Tab.default;
TabsTemp.Views = _TabViews.default;
TabsTemp.View = _TabView.default;
TabsTemp.Icon = _TabIcon.default;
const Tabs = TabsTemp;
exports.Tabs = Tabs;
//# sourceMappingURL=index.js.map