"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = require("../../primitives/Input");

var _Context = require("./Context");

var _reactNative = require("react-native");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PinInputFiled = ({
  fieldIndex = 0,
  defaultValue: pDefaultValue,
  ...props
}, ref) => {
  let {
    handleChange,
    value: cValue,
    setRefList,
    defaultValue: cDefaultValue,
    handleMultiValueChange,
    ...context
  } = _react.default.useContext(_Context.PinInputContext);

  cDefaultValue = cDefaultValue && cDefaultValue[fieldIndex];
  let defaultValue = pDefaultValue || cDefaultValue;
  let value = cValue && cValue[fieldIndex];

  const keyPressHandler = event => {
    if (_reactNative.Platform.OS !== 'web') {
      if (event.nativeEvent.key >= 0 && event.nativeEvent.key <= 9) {
        handleChange && handleChange(event.nativeEvent.key, fieldIndex);
      } else if (event.nativeEvent.key === 'Backspace') {
        handleChange && handleChange('', fieldIndex);
      }
    }
  };

  const textChangeHandler = value => {
    // Also used to handle change for Android.
    handleMultiValueChange && handleMultiValueChange(value, fieldIndex);
  };

  const myRef = _react.default.useRef(null);

  _react.default.useEffect(() => {
    setRefList && setRefList(myRef, fieldIndex);
  }, [myRef, fieldIndex, setRefList]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Input.Input //@ts-ignore
  , _extends({
    ref: (0, _utils.mergeRefs)([myRef, ref])
  }, context, props, {
    onKeyPress: event => keyPressHandler(event),
    onChangeText: value => textChangeHandler(value),
    keyboardType: "numeric",
    defaultValue: defaultValue,
    value: value
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(PinInputFiled));

exports.default = _default;
//# sourceMappingURL=PinInputField.js.map