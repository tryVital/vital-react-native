"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBreakpointResolvedProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _NativeBaseContext = require("../core/NativeBaseContext");

var _utils = require("./useThemeProps/utils");

var _useTheme = require("./../hooks/useTheme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useBreakpointResolvedProps = props => {
  const currentBreakpoint = (0, _NativeBaseContext.useNativeBaseConfig)('useBreakpointResolvedProps').currentBreakpoint;
  const theme = (0, _useTheme.useTheme)();

  const newProps = _react.default.useMemo(() => {
    let newProps = {};

    for (let key in props) {
      const rawValue = props[key];
      const value = (0, _utils.resolveValueWithBreakpoint)(rawValue, theme.breakpoints, currentBreakpoint, key);
      newProps[key] = value;
    }

    return newProps;
  }, [props, currentBreakpoint, theme.breakpoints]);

  return newProps;
};

exports.useBreakpointResolvedProps = useBreakpointResolvedProps;
//# sourceMappingURL=useBreakpointResolvedProps.js.map