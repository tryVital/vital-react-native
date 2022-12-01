"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyleElement = exports.useResponsiveQuery = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _useStableMemo = require("./useStableMemo");

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useResponsiveQuery = queries => {
  const windowWidth = (0, _reactNative.useWindowDimensions)().width;
  const values = (0, _useStableMemo.useStableMemo)(() => {
    const getResponsiveStyles = (0, _common.getResponsiveStylesImpl)(windowWidth);

    if (queries) {
      const {
        styles
      } = getResponsiveStyles(queries);
      return {
        styles,
        getResponsiveStyles
      };
    } else {
      return {
        getResponsiveStyles
      };
    }
  }, [queries, windowWidth]);
  return values;
};
/**
 * This function is copied from intergalacticspacehighway/rnw-responsive-ssr
 */
// noop, web-only. Refer useResponsiveQuery.web.tsx


exports.useResponsiveQuery = useResponsiveQuery;

const getStyleElement = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};

exports.getStyleElement = getStyleElement;
//# sourceMappingURL=useResponsiveQuery.js.map