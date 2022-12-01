"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbIcon = exports.BreadcrumbText = exports.Breadcrumb = void 0;
const baseStyle = {
  width: 'auto',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  spacing: '2'
};
const defaultProps = {
  direction: 'row',
  wrap: 'wrap'
};
const Breadcrumb = {
  baseStyle,
  defaultProps
};
exports.Breadcrumb = Breadcrumb;
const BreadcrumbText = {
  baseStyle: { ...baseStyle,
    _current: {
      fontWeight: 'bold'
    }
  },
  defaultProps
};
exports.BreadcrumbText = BreadcrumbText;
const BreadcrumbIcon = {
  baseStyle: { ...baseStyle
  },
  defaultProps
};
exports.BreadcrumbIcon = BreadcrumbIcon;
//# sourceMappingURL=breadcrumb.js.map