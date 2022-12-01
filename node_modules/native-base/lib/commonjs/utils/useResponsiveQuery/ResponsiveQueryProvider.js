"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveQueryProvider = exports.ResponsiveQueryContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResponsiveQueryContext = /*#__PURE__*/_react.default.createContext({
  disableCSSMediaQueries: false
});

exports.ResponsiveQueryContext = ResponsiveQueryContext;

const ResponsiveQueryProvider = props => {
  const value = _react.default.useMemo(() => ({
    disableCSSMediaQueries: props.disableCSSMediaQueries
  }), [props.disableCSSMediaQueries]);

  return /*#__PURE__*/_react.default.createElement(ResponsiveQueryContext.Provider, {
    value: value
  }, props.children);
};

exports.ResponsiveQueryProvider = ResponsiveQueryProvider;
//# sourceMappingURL=ResponsiveQueryProvider.js.map