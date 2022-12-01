"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AspectView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const [layout, setLayout] = _react.default.useState();

  const aspectViewStyle = [_reactNative.StyleSheet.flatten(props.style) || {}];

  if (layout) {
    // @ts-ignore
    let {
      width = 0,
      height = 0
    } = layout;

    if (width === 0) {
      aspectViewStyle.push({
        width: height * props.aspectRatio,
        height
      });
    } else {
      aspectViewStyle.push({
        width,
        height: width / props.aspectRatio
      });
    }
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    ref: ref
  }, props, {
    style: aspectViewStyle,
    onLayout: ({
      nativeEvent: {
        layout: inLayout
      }
    }) => setLayout(inLayout)
  }));
});

const AspectRatio = (props, ref) => {
  var _children$props;

  const {
    ratio,
    children = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null),
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('AspectRatio', props, {}, {
    resolveResponsively: ['ratio']
  });
  let computedStyle = resolvedProps.style;

  const newChildWithProps = /*#__PURE__*/_react.default.cloneElement(children, { ...(children === null || children === void 0 ? void 0 : children.props),
    style: _reactNative.StyleSheet.absoluteFillObject
  }, children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(resolvedProps)) {
    return null;
  } // DOC:  It uses a aspectRatio property of React Native and manually calculate on Web


  if (_reactNative.Platform.OS === 'web') {
    return /*#__PURE__*/_react.default.createElement(AspectView, _extends({
      aspectRatio: ratio
    }, resolvedProps, {
      ref: ref
    }), newChildWithProps);
  } else {
    computedStyle = _reactNative.StyleSheet.flatten([{
      style: resolvedProps.style
    }, {
      aspectRatio: ratio
    }]);
    return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
      style: computedStyle,
      ref: ref
    }), newChildWithProps);
  }
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(AspectRatio));

exports.default = _default;
//# sourceMappingURL=index.js.map