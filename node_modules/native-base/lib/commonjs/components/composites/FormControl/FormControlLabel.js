"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _useFormControl = require("./useFormControl");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FormControlLabel = ({
  children,
  ...props
}, ref) => {
  const formControlContext = (0, _useFormControl.useFormControlContext)();
  const combinedProps = (0, _utils.combineContextAndProps)(formControlContext, props);

  const _ref = _react.default.useRef(null);

  const {
    _astrick,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('FormControlLabel', combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid // isRequired: combinedProps.isRequired,

  });

  const requiredAsterisk = () => /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
    _web: {
      accessibilityHidden: true,
      //@ts-ignore
      accessibilityRole: 'presentation'
    }
  }, _astrick), "*");

  const mergedRef = (0, _utils.mergeRefs)([_ref, ref]);

  _react.default.useEffect(() => {
    if (_ref.current) {
      // RN web doesn't support htmlFor for Label element yet
      if (props.htmlFor) {
        _ref.current.htmlFor = props.htmlFor;
      } else if (resolvedProps !== null && resolvedProps !== void 0 && resolvedProps.nativeID) {
        _ref.current.htmlFor = resolvedProps.nativeID;
      }
    }
  }, [resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.nativeID, props.htmlFor]);

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    _web: {
      //@ts-ignore
      accessibilityRole: 'label'
    }
  }, resolvedProps, {
    nativeID: resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.labelId,
    ref: mergedRef
  }), children, (resolvedProps === null || resolvedProps === void 0 ? void 0 : resolvedProps.isRequired) && requiredAsterisk());
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(FormControlLabel));

exports.default = _default;
//# sourceMappingURL=FormControlLabel.js.map