"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResponsiveSSRProps = useResponsiveSSRProps;

var _react = require("react");

var _useTheme = require("../hooks/useTheme");

var _NativeBaseContext = require("../core/NativeBaseContext");

var _tools = require("../theme/tools");

function useResponsiveSSRProps(incomingProps) {
  const [modified, setModified] = (0, _react.useState)(false);
  const theme = (0, _useTheme.useTheme)();
  const responsivePropsExists = (0, _tools.isResponsiveAnyProp)(incomingProps, theme);
  const isSSR = (0, _NativeBaseContext.useNativeBaseConfig)('useBreakpointResolvedProps').isSSR;
  let modifiedProps = incomingProps;

  if (responsivePropsExists && isSSR && !modified) {
    modifiedProps = { ...modifiedProps,
      key: Math.random()
    };
  }

  (0, _react.useEffect)(() => {
    if (responsivePropsExists && isSSR) {
      setModified(true);
    }
  }, [responsivePropsExists, isSSR]);
  return modifiedProps;
}
//# sourceMappingURL=useResponsiveSSRProps.js.map