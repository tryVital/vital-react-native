"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePaddingProps = calculatePaddingProps;
exports.calculatePaddingTop = calculatePaddingTop;
exports.calculatePaddingBottom = calculatePaddingBottom;
exports.calculatePaddingLeft = calculatePaddingLeft;
exports.calculatePaddingRight = calculatePaddingRight;
exports.getSortedProps = getSortedProps;

var _theme = require("../../theme");

var _utils = require("../../theme/tools/utils");

var _lodash = _interopRequireDefault(require("lodash.isnil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculatePaddingProps(safeAreaProps, paddingProps, insets, sizes) {
  return _theme.themeTools.omitUndefined({
    pt: calculatePaddingTop(safeAreaProps, paddingProps, insets, sizes),
    pb: calculatePaddingBottom(safeAreaProps, paddingProps, insets, sizes),
    pl: calculatePaddingLeft(safeAreaProps, paddingProps, insets, sizes),
    pr: calculatePaddingRight(safeAreaProps, paddingProps, insets, sizes)
  });
}

function getValueInPixels(paddingProps, paddingKeys, sizes, inset, manualInset) {
  let appliedInset = 0;
  let originalValue = paddingKeys.length ? sizes[paddingProps[paddingKeys[paddingKeys.length - 1]]] : 0;

  if (!(0, _lodash.default)(manualInset) && typeof manualInset !== 'boolean') {
    // DOC: Handles case of manually passed inset
    appliedInset = typeof manualInset === 'string' && manualInset.includes('px') ? parseInt(manualInset, 10) : sizes[manualInset];
  } else {
    // DOC: Handles case of auto inset
    appliedInset = inset;
  }

  if (typeof originalValue === 'string') {
    if (originalValue.endsWith('px')) {
      return parseInt(originalValue, 10) + parseInt(appliedInset, 10) + 'px';
    } else if (originalValue.endsWith('rem')) {
      return parseFloat(originalValue) * _utils.baseFontSize + parseInt(appliedInset, 10) + 'px';
    }
  }

  return originalValue ? parseInt(originalValue, 10) + parseInt(appliedInset, 10) + 'px' : parseInt(appliedInset, 10) + 'px';
}

function calculatePaddingTop(safeAreaProps, paddingProps, insets, sizes) {
  if ((0, _lodash.default)(safeAreaProps.safeArea) && (0, _lodash.default)(safeAreaProps.safeAreaTop) && (0, _lodash.default)(safeAreaProps.safeAreaY)) {
    return;
  } // DOC: Adding it for manual inset passed by the user


  let [topSafeAreaProps] = _theme.themeTools.orderedExtractInObject(safeAreaProps, ['safeArea', 'safeAreaY', 'safeAreaTop']);

  let topSafeAreaArray = Object.keys(topSafeAreaProps);
  const manualInset = topSafeAreaArray.length ? topSafeAreaProps[topSafeAreaArray[topSafeAreaArray.length - 1]] : undefined;

  if (!insets.top && (typeof manualInset === 'boolean' || !manualInset)) {
    return;
  }

  const propKeys = getRelatedPaddingProps(paddingProps, ['p', 'padding', 'pt', 'paddingTop', 'py', 'paddingY']);
  return getValueInPixels(paddingProps, propKeys, sizes, insets.top, manualInset);
}

function calculatePaddingBottom(safeAreaProps, paddingProps, insets, sizes) {
  if ((0, _lodash.default)(safeAreaProps.safeArea) && (0, _lodash.default)(safeAreaProps.safeAreaBottom) && (0, _lodash.default)(safeAreaProps.safeAreaY)) {
    return;
  }

  let [bottomSafeAreaProps] = _theme.themeTools.orderedExtractInObject(safeAreaProps, ['safeArea', 'safeAreaY', 'safeAreaBottom']);

  let bottomSafeAreaArray = Object.keys(bottomSafeAreaProps);
  const manualInset = bottomSafeAreaArray.length ? bottomSafeAreaProps[bottomSafeAreaArray[bottomSafeAreaArray.length - 1]] : undefined;

  if (!insets.bottom && (!manualInset || typeof manualInset === 'boolean')) {
    return;
  }

  const propKeys = getRelatedPaddingProps(paddingProps, ['p', 'padding', 'pb', 'paddingBottom', 'py', 'paddingY']);
  return getValueInPixels(paddingProps, propKeys, sizes, insets.bottom, manualInset);
}

function calculatePaddingLeft(safeAreaProps, paddingProps, insets, sizes) {
  if ((0, _lodash.default)(safeAreaProps.safeArea) && (0, _lodash.default)(safeAreaProps.safeAreaLeft) && (0, _lodash.default)(safeAreaProps.safeAreaX)) {
    return;
  }

  let [leftSafeAreaProps] = _theme.themeTools.orderedExtractInObject(safeAreaProps, ['safeArea', 'safeAreaLeft', 'safeAreaX']);

  let leftSafeAreaArray = Object.keys(leftSafeAreaProps); // DOC: Since last value takes precedence so, directly takes last value

  const manualInset = leftSafeAreaArray.length ? leftSafeAreaProps[leftSafeAreaArray[leftSafeAreaArray.length - 1]] : undefined;

  if (!insets.left && (!manualInset || typeof manualInset === 'boolean')) {
    return;
  }

  const propKeys = getRelatedPaddingProps(paddingProps, ['p', 'padding', 'pl', 'paddingLeft', 'px', 'paddingX']);
  return getValueInPixels(paddingProps, propKeys, sizes, insets.left, manualInset);
}

function calculatePaddingRight(safeAreaProps, paddingProps, insets, sizes) {
  if ((0, _lodash.default)(safeAreaProps.safeArea) && (0, _lodash.default)(safeAreaProps.safeAreaRight) && (0, _lodash.default)(safeAreaProps.safeAreaX)) {
    return;
  } // DOC: Adding it for manual inset passed by the user


  let [rightSafeAreaProps] = _theme.themeTools.orderedExtractInObject(safeAreaProps, ['safeArea', 'safeAreaX', 'safeAreaRight']);

  let rightSafeAreaArray = Object.keys(rightSafeAreaProps);
  const manualInset = rightSafeAreaArray.length ? rightSafeAreaProps[rightSafeAreaArray[rightSafeAreaArray.length - 1]] : undefined;

  if (!insets.right && (!manualInset || typeof manualInset === 'boolean')) {
    return;
  }

  const propKeys = getRelatedPaddingProps(paddingProps, ['p', 'padding', 'pr', 'paddingRight', 'px', 'paddingX']);
  return getValueInPixels(paddingProps, propKeys, sizes, insets.right, manualInset);
}

function getRelatedPaddingProps(props, relatedKeys) {
  return Object.keys(props).filter(key => relatedKeys.includes(key));
}

function getSortedProps(props) {
  let [safeAreaProps, sansSafeAreaProps] = _theme.themeTools.orderedExtractInObject(props, ['safeArea', 'safeAreaX', 'safeAreaY', 'safeAreaTop', 'safeAreaBottom', 'safeAreaLeft', 'safeAreaRight']);

  let [paddingProps, sansPaddingProps] = _theme.themeTools.orderedExtractInObject(sansSafeAreaProps, ['p', 'padding', 'pt', 'paddingTop', 'pr', 'paddingRight', 'pb', 'paddingBottom', 'pl', 'paddingLeft', 'px', 'paddingX', 'py', 'paddingY']);

  return {
    safeAreaProps,
    paddingProps,
    sansPaddingProps
  };
}
//# sourceMappingURL=utils.js.map