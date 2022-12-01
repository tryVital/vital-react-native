"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _primitives = require("../../primitives");

var _Icons = require("../../primitives/Icon/Icons");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Context = require("./Context");

var _utils = require("../../../theme/tools/utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AlertIcon = ({
  children,
  ...props
}, ref) => {
  let newProps = (0, _useThemeProps.usePropsResolution)('AlertIcon', props);
  newProps = (0, _utils.omitUndefined)(newProps);

  const {
    status,
    _icon
  } = _react.default.useContext(_Context.AlertContext);

  const getIcon = () => {
    switch (status) {
      case 'error':
        return /*#__PURE__*/_react.default.createElement(_Icons.WarningTwoIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      case 'warning':
        return /*#__PURE__*/_react.default.createElement(_Icons.WarningIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      case 'success':
        return /*#__PURE__*/_react.default.createElement(_Icons.CheckCircleIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));

      default:
        return /*#__PURE__*/_react.default.createElement(_Icons.InfoIcon, _extends({}, _icon, newProps, {
          ref: ref
        }));
    }
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_primitives.Box, null, children || getIcon());
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(AlertIcon));

exports.default = _default;
//# sourceMappingURL=AlertIcon.js.map