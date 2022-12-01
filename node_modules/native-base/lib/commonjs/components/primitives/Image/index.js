"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Text = _interopRequireDefault(require("../Text"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _styled = require("../../../utils/styled");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledImage = (0, _styled.makeStyledComponent)(_reactNative.Image);
const Image = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    source,
    src,
    fallbackElement,
    alt,
    fallbackSource,
    ignoreFallback,
    _alt,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Image', props);
  const finalSource = (0, _react.useRef)(null);
  const getSource = (0, _react.useCallback)(() => {
    if (source) {
      finalSource.current = source;
    } else if (src) {
      finalSource.current = {
        uri: src
      };
    }

    return finalSource.current; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source === null || source === void 0 ? void 0 : source.uri, src]);
  const [renderedSource, setSource] = (0, _react.useState)(getSource());
  const [alternate, setAlternate] = (0, _react.useState)(false);
  const [fallbackSourceFlag, setfallbackSourceFlag] = (0, _react.useState)(true);

  _react.default.useEffect(() => {
    setSource(getSource());
    return () => {
      finalSource.current = null;
    };
  }, [source === null || source === void 0 ? void 0 : source.uri, src, getSource]);

  const onImageLoadError = (0, _react.useCallback)(event => {
    props.onError && props.onError(event);
    console.warn(event.nativeEvent.error);

    if (!ignoreFallback && fallbackSource && fallbackSource !== renderedSource && fallbackSourceFlag) {
      setfallbackSourceFlag(false);
      setSource(fallbackSource);
    } else {
      setAlternate(true);
    }
  }, [fallbackSource, fallbackSourceFlag, ignoreFallback, props, renderedSource]); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  if (typeof alt !== 'string') {
    console.warn('Please pass alt prop to Image component');
  }

  if (alternate) {
    if (fallbackElement) {
      if ( /*#__PURE__*/_react.default.isValidElement(fallbackElement)) {
        return fallbackElement;
      }
    } else return /*#__PURE__*/_react.default.createElement(_Text.default, _alt, alt);
  }

  return /*#__PURE__*/_react.default.createElement(StyledImage, _extends({
    source: renderedSource,
    accessibilityLabel: alt,
    alt: alt
  }, resolvedProps, {
    onError: onImageLoadError,
    ref: ref
  }));
}));
const ImageWithStatics = { ...Image,
  //@ts-ignore
  getSize: _reactNative.Image.getSize,
  prefetch: _reactNative.Image.prefetch,
  queryCache: _reactNative.Image.queryCache
};
var _default = ImageWithStatics;
exports.default = _default;
//# sourceMappingURL=index.js.map