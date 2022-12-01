"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../../hooks");

var _FormControl = require("../FormControl");

var _Context = require("./Context");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NumberInput = ({
  children,
  ...props
}, ref) => {
  const {
    defaultValue,
    keepWithinRange,
    value,
    min,
    max,
    onChange,
    ...newProps
  } = (0, _hooks.useThemeProps)('NumberInput', props);
  const formControlContext = (0, _FormControl.useFormControlContext)();

  const [numberInputValue, setNumberInputValue] = _react.default.useState(parseInt(value || defaultValue, 10));

  const [numberInputStepper, setNumberInputStepper] = _react.default.useState(null);

  const handleChange = newValue => {
    const temp = newValue;
    setNumberInputValue(temp);

    if (keepWithinRange) {
      if (newValue < min) setNumberInputValue(min);else if (newValue > max) setNumberInputValue(max);
    } //NOTE: only calling onChange on stepper click or blur event of input.


    onChange && onChange(temp);
  };

  const handleChangeWithoutCheck = newValue => {
    const temp = newValue;
    setNumberInputValue(temp);
  };

  _react.default.useEffect(() => {
    if (value !== undefined && value != numberInputValue) setNumberInputValue(value);
  }, [value, numberInputValue, setNumberInputValue]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_Context.NumberInputContext.Provider, {
    value: { ...formControlContext,
      ...newProps,
      min,
      max,
      handleChange,
      handleChangeWithoutCheck,
      numberInputValue,
      numberInputStepper,
      setNumberInputStepper,
      isControlled: value !== undefined
    }
  }, children));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(NumberInput));

exports.default = _default;
//# sourceMappingURL=NumberInput.js.map