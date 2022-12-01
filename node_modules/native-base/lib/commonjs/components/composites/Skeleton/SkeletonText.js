"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../../hooks");

var _Stack = require("../../primitives/Stack");

var _Skeleton = _interopRequireDefault(require("./Skeleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SkeletonText = (props, ref) => {
  // const { children, ...props } = allProps;
  const {
    children,
    startColor,
    endColor,
    lines,
    isLoaded,
    _line,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('SkeletonText', props);
  const computedChildren = []; //generating an array of skeleton components (same length as noOfLines)

  for (let i = 0; i < lines; i++) {
    //check for last line (to change the width of last line)
    if (i === lines - 1 && lines !== 1) {
      computedChildren.push(
      /*#__PURE__*/
      //Using Skeleton component with required props
      _react.default.createElement(_Skeleton.default, _extends({
        key: i,
        endColor: endColor,
        startColor: startColor,
        w: "75%"
      }, _line)));
    } else computedChildren.push( /*#__PURE__*/_react.default.createElement(_Skeleton.default, _extends({
      key: i,
      endColor: endColor,
      startColor: startColor
    }, _line)));
  }

  return isLoaded ? children : /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({}, resolvedProps, {
    ref: ref
  }), computedChildren);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(SkeletonText));

exports.default = _default;
//# sourceMappingURL=SkeletonText.js.map