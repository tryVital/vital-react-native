"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Stack = require("../../primitives/Stack");

var _hooks = require("../../../hooks");

var _FormControl = require("../FormControl");

var _reactNative = require("react-native");

var _Context = require("./Context");

var _theme = require("../../../theme");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PinInput = ({
  children,
  ...props
}, ref) => {
  let [padding, remProps] = _theme.themeTools.extractInObject(props, ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr']);

  const {
    manageFocus,
    defaultValue,
    value,
    space,
    onChange,
    ...newProps
  } = (0, _hooks.useThemeProps)('PinInput', remProps);
  const formControlContext = (0, _FormControl.useFormControlContext)();
  const RefList = [];

  const setRefList = (ref, index) => {
    RefList[index] = ref;
  };

  const [pinInputValue, setPinInputValue] = _react.default.useState(value || defaultValue);

  const handleChange = (newValue, fieldIndex) => {
    let temp = pinInputValue && [...pinInputValue] || [];
    temp[fieldIndex] = newValue;
    value === undefined && setPinInputValue(temp.join(''));
    onChange && onChange(temp.join(''));
    if (newValue === '' && manageFocus && fieldIndex - 1 > -1) RefList[fieldIndex - 1].current.focus();else if (newValue && manageFocus && fieldIndex + 1 < RefList.length) RefList[fieldIndex + 1].current.focus();
    return temp.join('');
  };

  const handleMultiValueChange = (newValue, fieldIndex) => {
    const pinFieldLength = RefList.length;
    const newValueLength = newValue.length;

    if (newValueLength >= pinFieldLength && newValueLength > 2) {
      let splicedValue = newValue ? [...newValue] : [];
      splicedValue.splice(pinFieldLength);
      RefList[pinFieldLength - 1].current.focus();
      setPinInputValue(splicedValue.join(''));
      onChange && onChange(splicedValue.join(''));
    }

    if (_reactNative.Platform.OS !== 'ios') {
      let temp = pinInputValue ? [...pinInputValue] : [];

      if (newValue === '') {
        // Handling Backward focus.
        temp = temp.filter((_n, i) => i !== fieldIndex);
        if (manageFocus && fieldIndex - 1 > -1) RefList[fieldIndex - 1].current.focus();
      } else {
        temp[fieldIndex] = JSON.stringify(parseInt(newValue, 10) % 10);
        if (manageFocus && fieldIndex + 1 < RefList.length) RefList[fieldIndex + 1].current.focus();
      }

      value === undefined && setPinInputValue(temp.join(''));
      onChange && onChange(temp.join(''));
    }
  };

  const indexSetter = allChildren => {
    let pinInputFiledCounter = -1;
    return _react.default.Children.map(allChildren, child => {
      pinInputFiledCounter++;
      return /*#__PURE__*/_react.default.cloneElement(child, {
        fieldIndex: pinInputFiledCounter
      }, child.props.children);
    });
  };

  _react.default.useEffect(() => {
    if (value !== undefined && value != pinInputValue) setPinInputValue(value);
  }, [value, pinInputValue, setPinInputValue]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Context.PinInputContext.Provider, {
    value: { ...formControlContext,
      ...newProps,
      setRefList,
      handleChange,
      handleMultiValueChange,
      value: pinInputValue
    }
  }, children && /*#__PURE__*/_react.default.createElement(_Stack.HStack, _extends({
    flexDirection: "row",
    space: space
  }, padding, {
    ref: ref
  }), indexSetter(children)));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(PinInput));

exports.default = _default;
//# sourceMappingURL=PinInput.js.map