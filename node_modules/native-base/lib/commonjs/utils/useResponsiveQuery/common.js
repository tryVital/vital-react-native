"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDimensionsWithEnable = exports.getResponsiveStylesImpl = void 0;

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getResponsiveStylesImpl = width => queries => {
  if (typeof width === 'number') {
    let styles = queries.initial ? [_reactNative.StyleSheet.create({
      initial: _reactNative.StyleSheet.flatten(queries.initial)
    }).initial] : [];

    if (queries.query) {
      queries.query.forEach(queryRule => {
        if (queryRule.style) {
          const flattenQueryStyle = _reactNative.StyleSheet.flatten(queryRule.style);

          if (typeof queryRule.maxWidth === 'number' && typeof queryRule.minWidth === 'number') {
            if (width >= queryRule.minWidth && width <= queryRule.maxWidth) {
              styles.push(_reactNative.StyleSheet.create({
                rangeStyle: flattenQueryStyle
              }).rangeStyle);
            }
          } else if (typeof queryRule.minWidth === 'number') {
            if (width >= queryRule.minWidth) {
              styles.push(_reactNative.StyleSheet.create({
                minWidthStyle: flattenQueryStyle
              }).minWidthStyle);
            }
          } else if (typeof queryRule.maxWidth === 'number') {
            if (width <= queryRule.maxWidth) {
              styles.push(_reactNative.StyleSheet.create({
                maxWidthStyle: flattenQueryStyle
              }).maxWidthStyle);
            }
          }
        }
      });
      return {
        styles
      };
    }
  }

  return {};
}; // The below implementation is taken from React Native's source and added a flag to conditionally attach/remove listeners


exports.getResponsiveStylesImpl = getResponsiveStylesImpl;

const useDimensionsWithEnable = ({
  enable
}) => {
  const [dimensions, setDimensions] = _react.default.useState(() => _reactNative.Dimensions.get('window'));

  _react.default.useEffect(() => {
    if (enable) {
      function handleChange({
        window
      }) {
        if (dimensions.width !== window.width || dimensions.height !== window.height || dimensions.scale !== window.scale || dimensions.fontScale !== window.fontScale) {
          setDimensions(window);
        }
      }

      _reactNative.Dimensions.addEventListener('change', handleChange); // We might have missed an update between calling `get` in render and
      // `addEventListener` in this handler, so we set it here. If there was
      // no change, React will filter out this update as a no-op.


      handleChange({
        window: _reactNative.Dimensions.get('window')
      });
      return () => {
        _reactNative.Dimensions.removeEventListener('change', handleChange);
      };
    }

    return () => {};
  }, [dimensions, enable]);

  return dimensions;
};

exports.useDimensionsWithEnable = useDimensionsWithEnable;
//# sourceMappingURL=common.js.map