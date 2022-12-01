import React from 'react';
export const ResponsiveQueryContext = /*#__PURE__*/React.createContext({
  disableCSSMediaQueries: false
});
export const ResponsiveQueryProvider = props => {
  const value = React.useMemo(() => ({
    disableCSSMediaQueries: props.disableCSSMediaQueries
  }), [props.disableCSSMediaQueries]);
  return /*#__PURE__*/React.createElement(ResponsiveQueryContext.Provider, {
    value: value
  }, props.children);
};
//# sourceMappingURL=ResponsiveQueryProvider.js.map