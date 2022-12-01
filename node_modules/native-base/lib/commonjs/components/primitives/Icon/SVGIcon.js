"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../../hooks");

var _styled = require("../../../utils/styled");

var _nbSvg = require("./nbSvg");

var _questionIconPath = require("./Icons/questionIconPath");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SVG = (0, _styled.makeStyledComponent)(_nbSvg.Svg);

const SVGIcon = ({
  children,
  ...props
}, ref) => {
  const {
    focusable,
    stroke,
    color,
    size,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Icon', props);
  const strokeHex = (0, _hooks.useToken)('colors', stroke || '');
  const colorHex = (0, _hooks.useToken)('colors', color || ''); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(SVG, _extends({}, resolvedProps, {
    // height={
    //   newProps.size
    //     ? parseInt(newProps.size, 10)
    //     : parseInt(newProps.height, 10)
    // }
    // width={
    //   newProps.size
    //     ? parseInt(newProps.size, 10)
    //     : parseInt(newProps.width, 10)
    // }
    size: size,
    color: colorHex,
    stroke: strokeHex,
    focusable: focusable,
    accessibilityRole: "image" // style={style}
    ,
    ref: ref
  }), _react.default.Children.count(children) > 0 ? /*#__PURE__*/_react.default.createElement(_nbSvg.G, null, _react.default.Children.map(children, (child, i) => {
    var _child$key;

    return /*#__PURE__*/_react.default.createElement(ChildPath, _extends({
      key: (_child$key = child === null || child === void 0 ? void 0 : child.key) !== null && _child$key !== void 0 ? _child$key : i,
      element: child
    }, child === null || child === void 0 ? void 0 : child.props));
  })) : _questionIconPath.questionOutlineIconPath);
};

const ChildPath = ({
  element,
  fill,
  stroke: pathStroke
}) => {
  const pathStrokeColor = (0, _hooks.useToken)('colors', pathStroke || '');
  const fillColor = (0, _hooks.useToken)('colors', fill || '');

  if (!element) {
    return null;
  }

  return /*#__PURE__*/_react.default.cloneElement(element, {
    fill: fillColor ? fillColor : 'currentColor',
    stroke: pathStrokeColor
  });
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(SVGIcon));

exports.default = _default;
//# sourceMappingURL=SVGIcon.js.map