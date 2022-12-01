function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { View } from 'react-native';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { getColor } from '../../../theme';
import { useTheme } from '../../../hooks';
import { makeStyledComponent } from '../../../utils/styled';
import { wrapStringChild } from '../../../utils/wrapStringChild';
import { useSafeArea } from '../../../hooks/useSafeArea';
import { useNativeBaseConfig } from '../../../core/NativeBaseContext';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const StyledBox = makeStyledComponent(View);
let MemoizedGradient;

const Box = ({
  children,
  ...props
}, ref) => {
  var _useNativeBaseConfig$, _resolvedProps$bg, _resolvedProps$backgr, _resolvedProps$bgColo, _resolvedProps$backgr2;

  // const { _text, ...resolvedProps } = useThemeProps('Box', props);
  const theme = useTheme();
  const {
    _text,
    ...resolvedProps
  } = usePropsResolution('Box', props);
  let Gradient = (_useNativeBaseConfig$ = useNativeBaseConfig('NativeBaseConfigProvider').config.dependencies) === null || _useNativeBaseConfig$ === void 0 ? void 0 : _useNativeBaseConfig$['linear-gradient'];
  const safeAreaProps = useSafeArea(resolvedProps); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if ((_resolvedProps$bg = resolvedProps.bg) !== null && _resolvedProps$bg !== void 0 && _resolvedProps$bg.linearGradient || (_resolvedProps$backgr = resolvedProps.background) !== null && _resolvedProps$backgr !== void 0 && _resolvedProps$backgr.linearGradient || (_resolvedProps$bgColo = resolvedProps.bgColor) !== null && _resolvedProps$bgColo !== void 0 && _resolvedProps$bgColo.linearGradient || (_resolvedProps$backgr2 = resolvedProps.backgroundColor) !== null && _resolvedProps$backgr2 !== void 0 && _resolvedProps$backgr2.linearGradient) {
    var _resolvedProps$bg2, _resolvedProps$backgr3, _resolvedProps$bgColo2, _resolvedProps$backgr4;

    const lgrad = ((_resolvedProps$bg2 = resolvedProps.bg) === null || _resolvedProps$bg2 === void 0 ? void 0 : _resolvedProps$bg2.linearGradient) || ((_resolvedProps$backgr3 = resolvedProps.background) === null || _resolvedProps$backgr3 === void 0 ? void 0 : _resolvedProps$backgr3.linearGradient) || ((_resolvedProps$bgColo2 = resolvedProps.bgColor) === null || _resolvedProps$bgColo2 === void 0 ? void 0 : _resolvedProps$bgColo2.linearGradient) || ((_resolvedProps$backgr4 = resolvedProps.backgroundColor) === null || _resolvedProps$backgr4 === void 0 ? void 0 : _resolvedProps$backgr4.linearGradient);

    if (Gradient) {
      var _lgrad$colors;

      if (!MemoizedGradient) {
        MemoizedGradient = makeStyledComponent(Gradient);
      }

      Gradient = MemoizedGradient;
      lgrad.colors = (_lgrad$colors = lgrad.colors) === null || _lgrad$colors === void 0 ? void 0 : _lgrad$colors.map(color => {
        return getColor(color, theme.colors, theme);
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
      return /*#__PURE__*/React.createElement(Gradient, _extends({
        ref: ref
      }, safeAreaProps, {
        colors: lgrad.colors,
        start: startObj,
        end: endObj,
        locations: lgrad.locations
      }), wrapStringChild(children, _text));
    }
  }

  return /*#__PURE__*/React.createElement(StyledBox, _extends({
    ref: ref
  }, safeAreaProps), wrapStringChild(children, _text));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Box));
//# sourceMappingURL=index.js.map