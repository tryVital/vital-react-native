"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../Box"));

var _utils = require("../../../utils");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _ResponsiveQueryProvider = require("../../../utils/useResponsiveQuery/ResponsiveQueryProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Stack = ({
  space,
  ...props
}, ref) => {
  const dir = props.direction;
  const {
    children,
    direction,
    reversed,
    divider,
    size,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Stack', { ...props,
    size: space
  }, {
    isDisabled: props.isDisabled,
    isHovered: props.isHovered,
    isFocused: props.isFocused,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly
  }, {
    resolveResponsively: ['space', 'direction']
  });

  const responsiveQueryContext = _react.default.useContext(_ResponsiveQueryProvider.ResponsiveQueryContext);

  const disableCSSMediaQueries = responsiveQueryContext.disableCSSMediaQueries; //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    flexDirection: dir
  }, resolvedProps, {
    ref: ref // @ts-ignore
    ,
    gap: disableCSSMediaQueries ? undefined : size
  }), (0, _utils.getSpacedChildren)(children, size, direction === 'row' ? 'X' : 'Y', reversed ? 'reverse' : 'normal', divider));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Stack));

exports.default = _default;
//# sourceMappingURL=Stack.js.map