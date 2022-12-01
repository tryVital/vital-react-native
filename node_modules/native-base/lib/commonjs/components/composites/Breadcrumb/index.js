"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumb = void 0;

var _Breadcrumb = _interopRequireDefault(require("./Breadcrumb"));

var _BreadcrumbLink = _interopRequireDefault(require("./BreadcrumbLink"));

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

var _BreadcrumbText = _interopRequireDefault(require("./BreadcrumbText"));

var _BreadcrumbIcon = _interopRequireDefault(require("./BreadcrumbIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let BreadcrumbTemp = _Breadcrumb.default;
BreadcrumbTemp.Item = _BreadcrumbItem.default;
BreadcrumbTemp.Link = _BreadcrumbLink.default;
BreadcrumbTemp.Text = _BreadcrumbText.default;
BreadcrumbTemp.Icon = _BreadcrumbIcon.default; // To add typings

const Breadcrumb = BreadcrumbTemp;
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=index.js.map