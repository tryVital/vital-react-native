"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _primitives = require("../../primitives");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _lodash = _interopRequireDefault(require("lodash.isnil"));

var _lodash2 = _interopRequireDefault(require("lodash.has"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Avatar = ({
  children,
  ...props
}, ref) => {
  const [error, setError] = _react.default.useState(false);

  const {
    _image,
    _badgeSize,
    source,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('Avatar', props);

  let Badge = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);

  const remainingChildren = []; //  Pop Badge from children

  _react.default.Children.map(children, child => {
    if (typeof (child === null || child === void 0 ? void 0 : child.type) === 'object' && (child === null || child === void 0 ? void 0 : child.type.displayName) === 'AvatarBadge') {
      var _child$props, _child$props2;

      Badge = /*#__PURE__*/_react.default.cloneElement(child, {
        size: child !== null && child !== void 0 && (_child$props = child.props) !== null && _child$props !== void 0 && _child$props.size ? child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.size : _badgeSize ? _badgeSize[0] : undefined
      });
    } else {
      remainingChildren.push(child);
    }
  }); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  const getSource = () => {
    if (source) {
      if ((0, _lodash2.default)(source, 'uri') && !(0, _lodash.default)(source.uri)) {
        return source;
      } else if (!(0, _lodash2.default)(source, 'uri')) {
        return source;
      }
    }

    return null;
  };

  const imageSource = getSource();
  return /*#__PURE__*/_react.default.createElement(_primitives.Box, resolvedProps, imageSource && !error ? /*#__PURE__*/_react.default.createElement(_primitives.Image, _extends({
    source: source,
    onError: () => {
      setError(true);
    }
  }, _image, {
    ref: ref
  })) : remainingChildren.length !== 0 && remainingChildren, Badge);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Avatar));

exports.default = _default;
//# sourceMappingURL=Avatar.js.map