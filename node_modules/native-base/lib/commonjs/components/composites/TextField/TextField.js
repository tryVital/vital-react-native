"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../../hooks");

var _Stack = require("../../primitives/Stack");

var _Input = require("../../primitives/Input");

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _utils = require("../../../theme/tools/utils");

var _Select = _interopRequireDefault(require("../../primitives/Select"));

var _TextArea = _interopRequireDefault(require("../../primitives/TextArea"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TextField = (mainProps, ref) => {
  //TODO: Remove `any`
  const {
    children,
    helperText,
    errorMessage,
    InputLeftElement,
    InputRightElement,
    dropdownIcon,
    ...props
  } = mainProps;
  const {
    divider,
    _errorMessageProps,
    _helperTextProps,
    component,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('TextField', props);
  const [layoutProps, componentProps] = (0, _utils.extractInObject)(resolvedProps, ['space', 'reversed', ..._utils.stylingProps.margin, ..._utils.stylingProps.layout, ..._utils.stylingProps.flexbox, ..._utils.stylingProps.position]); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  const activeComponent = () => {
    switch (component) {
      case 'select':
        return /*#__PURE__*/_react.default.createElement(_Select.default, _extends({}, componentProps, {
          dropdownIcon: dropdownIcon
        }), children);

      case 'textarea':
        return /*#__PURE__*/_react.default.createElement(_TextArea.default, _extends({}, componentProps, {
          ref: ref
        }));

      default:
        return /*#__PURE__*/_react.default.createElement(_Input.Input, _extends({
          InputLeftElement: InputLeftElement,
          InputRightElement: InputRightElement
        }, componentProps, {
          ref: ref
        }));
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({
    divider: divider
  }, layoutProps), activeComponent(), componentProps.isInvalid && /*#__PURE__*/_react.default.createElement(_Text.default, _errorMessageProps, errorMessage), !componentProps.isInvalid && /*#__PURE__*/_react.default.createElement(_Text.default, _helperTextProps, helperText));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(TextField));

exports.default = _default;
//# sourceMappingURL=TextField.js.map