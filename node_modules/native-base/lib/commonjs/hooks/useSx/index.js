"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSx = void 0;

var _useStyledSystemPropsResolver = require("../useStyledSystemPropsResolver");

var _NativeBaseContext = require("../../core/NativeBaseContext");

var _tools = require("../../theme/tools");

var _useTheme = require("../useTheme");

var _react = require("react");

var _stableHash = _interopRequireDefault(require("stable-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//@ts-ignore
const useSx = () => {
  const isSSR = (0, _NativeBaseContext.useNativeBaseConfig)('useBreakpointResolvedProps').isSSR;
  const theme = (0, _useTheme.useTheme)();

  const Sx = query => {
    const StableHashQuery = (0, _stableHash.default)(query);
    const checkWarning = (0, _react.useMemo)(() => {
      return (0, _tools.isResponsiveAnyProp)(query, theme); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [StableHashQuery]);

    if (isSSR && checkWarning) {
      console.warn("useSx prop doesn't resolve responsive prop with SSR");
    } // eslint-disable-next-line


    const [_style, _restProps, styleFromProps] = (0, _useStyledSystemPropsResolver.useStyledSystemPropsResolver)(query);
    return styleFromProps;
  };

  return Sx;
};

exports.useSx = useSx;
//# sourceMappingURL=index.js.map