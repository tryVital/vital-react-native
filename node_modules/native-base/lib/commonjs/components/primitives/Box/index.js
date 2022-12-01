"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _theme = require("../../../theme");

var _hooks = require("../../../hooks");

var _styled = require("../../../utils/styled");

var _wrapStringChild = require("../../../utils/wrapStringChild");

var _useSafeArea = require("../../../hooks/useSafeArea");

var _NativeBaseContext = require("../../../core/NativeBaseContext");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledBox = (0, _styled.makeStyledComponent)(_reactNative.View);
let MemoizedGradient;

const Box = ({
  children,
  ...props
}, ref) => {
  var _useNativeBaseConfig$, _resolvedProps$bg, _resolvedProps$backgr, _resolvedProps$bgColo, _resolvedProps$backgr2;

  // const { _text, ...resolvedProps } = useThemeProps('Box', props);
  const theme = (0, _hooks.useTheme)();
  const {
    _text,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Box', props);
  let Gradient = (_useNativeBaseConfig$ = (0, _NativeBaseContext.useNativeBaseConfig)('NativeBaseConfigProvider').config.dependencies) === null || _useNativeBaseConfig$ === void 0 ? void 0 : _useNativeBaseConfig$['linear-gradient'];
  const safeAreaProps = (0, _useSafeArea.useSafeArea)(resolvedProps); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if ((_resolvedProps$bg = resolvedProps.bg) !== null && _resolvedProps$bg !== void 0 && _resolvedProps$bg.linearGradient || (_resolvedProps$backgr = resolvedProps.background) !== null && _resolvedProps$backgr !== void 0 && _resolvedProps$backgr.linearGradient || (_resolvedProps$bgColo = resolvedProps.bgColor) !== null && _resolvedProps$bgColo !== void 0 && _resolvedProps$bgColo.linearGradient || (_resolvedProps$backgr2 = resolvedProps.backgroundColor) !== null && _resolvedProps$backgr2 !== void 0 && _resolvedProps$backgr2.linearGradient) {
    var _resolvedProps$bg2, _resolvedProps$backgr3, _resolvedProps$bgColo2, _resolvedProps$backgr4;

    const lgrad = ((_resolvedProps$bg2 = resolvedProps.bg) === null || _resolvedProps$bg2 === void 0 ? void 0 : _resolvedProps$bg2.linearGradient) || ((_resolvedProps$backgr3 = resolvedProps.background) === null || _resolvedProps$backgr3 === void 0 ? void 0 : _resolvedProps$backgr3.linearGradient) || ((_resolvedProps$bgColo2 = resolvedProps.bgColor) === null || _resolvedProps$bgColo2 === void 0 ? void 0 : _resolvedProps$bgColo2.linearGradient) || ((_resolvedProps$backgr4 = resolvedProps.backgroundColor) === null || _resolvedProps$backgr4 === void 0 ? void 0 : _resolvedProps$backgr4.linearGradient);

    if (Gradient) {
      var _lgrad$colors;

      if (!MemoizedGradient) {
        MemoizedGradient = (0, _styled.makeStyledComponent)(Gradient);
      }

      Gradient = MemoizedGradient;
      lgrad.colors = (_lgrad$colors = lgrad.colors) === null || _lgrad$colors === void 0 ? void 0 : _lgrad$colors.map(color => {
        return (0, _theme.getColor)(color, theme.colors, theme);
      });
      let startObj = {
        x: 0,
        y: 0
      };
      let endObj = {
        x: 0,
        y: 1
      };

      if (lgrad.start && lgrad.start.length === 2) {
        startObj = {
          x: lgrad.start[0],
          y: lgrad.start[1]
        };
      }

      if (lgrad.end && lgrad.end.length === 2) {
        endObj = {
          x: lgrad.end[0],
          y: lgrad.end[1]
        };
      }

      const backgroundColorProps = ['bg', 'bgColor', 'background', 'backgroundColor'];
      backgroundColorProps.forEach(backgroundColorProp => {
        if (backgroundColorProp in safeAreaProps) delete safeAreaProps[backgroundColorProp];
      });
      return /*#__PURE__*/_react.default.createElement(Gradient, _extends({
        ref: ref
      }, safeAreaProps, {
        colors: lgrad.colors,
        start: startObj,
        end: endObj,
        locations: lgrad.locations
      }), (0, _wrapStringChild.wrapStringChild)(children, _text));
    }
  }

  return /*#__PURE__*/_react.default.createElement(StyledBox, _extends({
    ref: ref
  }, safeAreaProps), (0, _wrapStringChild.wrapStringChild)(children, _text));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Box));

exports.default = _default;
//# sourceMappingURL=index.js.map