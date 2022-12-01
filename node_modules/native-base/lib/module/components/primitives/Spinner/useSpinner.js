export function useSpinner(props) {
  var _props$accessibilityL;

  return {
    spinnerProps: {
      accessible: true,
      accessibilityLabel: (_props$accessibilityL = props.accessibilityLabel) !== null && _props$accessibilityL !== void 0 ? _props$accessibilityL : 'loading'
    }
  };
}
//# sourceMappingURL=useSpinner.js.map