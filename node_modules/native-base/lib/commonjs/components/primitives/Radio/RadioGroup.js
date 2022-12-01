"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Stack = require("../Stack");

var _FormControl = require("../../composites/FormControl");

var _radio2 = require("@react-stately/radio");

var _radio3 = require("@react-native-aria/radio");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _useThemeProps = require("../../../hooks/useThemeProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RadioContext = /*#__PURE__*/_react.default.createContext({});

exports.RadioContext = RadioContext;
const RadioWrapper = /*#__PURE__*/(0, _react.memo)(props => {
  const resolvedProps = (0, _useThemeProps.usePropsResolution)('RadioGroup', props);
  return /*#__PURE__*/_react.default.createElement(_Stack.Stack, _extends({}, resolvedProps, props.radioGroupProps, props));
});

const RadioGroup = ({
  size,
  colorScheme,
  _radio,
  children,
  ...props
}, ref) => {
  const formControlContext = (0, _FormControl.useFormControlContext)();
  const state = (0, _radio2.useRadioGroupState)(props);
  const radioGroupState = (0, _radio3.useRadioGroup)({ ...formControlContext,
    ...props,
    'aria-label': props.accessibilityLabel
  }, state);

  const [propsState] = _react.default.useState(props);

  const contextValue = _react.default.useMemo(() => {
    return {
      formControlContext,
      size,
      colorScheme,
      ..._radio,
      state
    };
  }, [size, colorScheme, formControlContext, state, _radio]);

  const radioGroupProps = _react.default.useMemo(() => radioGroupState.radioGroupProps, // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)({ ...props,
    size,
    colorScheme
  })) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(RadioContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(RadioWrapper, _extends({}, radioGroupProps, propsState, {
    ref: ref
  }), children));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(RadioGroup));

exports.default = _default;
//# sourceMappingURL=RadioGroup.js.map