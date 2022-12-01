"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProps = findProps;

var _theme = require("../../../theme");

function findProps(props) {
  const [textProps, remaining] = _theme.themeTools.extractInObject(props, ['fontWeight', 'fontSize', 'textDecorationLine', 'color']);

  const [borderProps, otherRemainingProps] = _theme.themeTools.extractInObject(remaining, ['border', 'borderBottom', 'borderTop', 'borderLeft', 'borderRight', 'borderWidth', 'borderRadius', 'borderColor', 'borderRightColor', 'borderBottomWidth', 'borderLeftWidth', 'borderTopWidth', 'borderBotttomWidth', 'borderTopLeftRadius', 'borderBottomColor', 'borderBottomEndRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomStartRadius', 'borderBottomWidth', 'borderEndColor', 'borderLeftColor', 'borderLeftWidth', 'borderRadius', 'borderRightWidth', 'borderStartColor', 'borderTopColor', 'borderTopEndRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStartRadius', 'borderTopWidth']);

  const [layoutProps, remainingProps] = _theme.themeTools.extractInObject(otherRemainingProps, ['m', 'margin', 'mt', 'marginTop', 'mr', 'marginRight', 'mb', 'marginBottom', 'ml', 'marginLeft', 'mx', 'marginX', 'my', 'marginY', 'left', 'top', 'bottom', 'right', 'position', 'minH', 'minHeight', 'minWidth', 'minW', 'height', 'width']);

  return [textProps, remainingProps, layoutProps, borderProps];
}
//# sourceMappingURL=utils.js.map