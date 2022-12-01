"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThemeProps = useThemeProps;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.omit"));

var _reactNative = require("react-native");

var _useNativeBase = require("./../useNativeBase");

var _tools = require("./../../theme/tools/");

var _filterShadowProps = require("./../../utils/filterShadowProps");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filterAndCalculateProps = (theme, colorModeProps, componentTheme, propsReceived, windowWidth) => {
  // Extracting out children and style, as they do not contribute in props calculation
  // This is done as these props are passed as it is later in the development
  // Required as some of these will trigger cyclic computation which may lead to error
  let [ignoredProps, props] = (0, _tools.extractInObject)(propsReceived, ['children', 'style', 'onPress', 'icon', 'onOpen', 'onClose']);
  let newProps = (0, _utils.calculateProps)(theme, colorModeProps, componentTheme, props, windowWidth);
  let mergedProps = (0, _filterShadowProps.filterShadowProps)(newProps, ignoredProps, _reactNative.Platform.OS);
  return (0, _tools.omitUndefined)(mergedProps);
};

function useThemeProps(component, propsReceived) {
  var _useWindowDimensions;

  const {
    theme,
    ...colorModeProps
  } = (0, _useNativeBase.useNativeBase)(); // console.log('THEME = ', theme);

  const componentTheme = (0, _lodash.default)(theme, "components.".concat(component)); // console.log('COMPONENT THEME = ', componentTheme);

  const windowWidth = (_useWindowDimensions = (0, _reactNative.useWindowDimensions)()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width; // To pass the component theme props and component props seperately

  return filterAndCalculateProps((0, _lodash2.default)(theme, ['components']), colorModeProps, componentTheme, propsReceived, windowWidth);
}
//# sourceMappingURL=useProps.js.map