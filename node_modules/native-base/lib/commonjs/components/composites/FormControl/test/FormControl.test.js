"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

var _reactNative = require("react-native");

var _reactNative2 = require("@testing-library/react-native");

var _testUtils = require("../../../../utils/test-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Input = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const inputProps = (0, _index.useFormControl)(props);
  return (
    /*#__PURE__*/
    //@ts-ignore
    _react.default.createElement(_reactNative.TextInput, _extends({
      ref: ref
    }, inputProps))
  );
});

it('a11y test in when required', async () => {
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: "name",
    isRequired: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, null, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/_react.default.createElement(_index.FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityRequired).toBe(true);
  expect(textInput.props.required).toBe(true);
});
it('a11y test in when invalid', async () => {
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: "name",
    isInvalid: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, null, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/_react.default.createElement(_index.FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityInvalid).toBe(true);
});
it('a11y test in when readOnly', async () => {
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: "name",
    isReadOnly: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, null, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/_react.default.createElement(_index.FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityReadOnly).toBe(true);
  expect(textInput.props.readOnly).toBe(true);
});
it('a11y test in when disabled', async () => {
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: "name",
    isDisabled: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, null, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/_react.default.createElement(_index.FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.disabled).toBe(true);
});
it('a11y test when helper text is present', async () => {
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: "name",
    isDisabled: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, null, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityDescribedBy).toBe('name-helptext');
  expect(textInput.props.accessibilityReadOnly).toBeUndefined();
  expect(textInput.props.accessibilityInvalid).toBeUndefined();
  expect(textInput.props.accessibilityRequired).toBeUndefined();
});
it('sets htmlFor of FormLabel ref to nativeID of Input', async () => {
  let ref;
  const inputID = 'name';
  let {
    getByPlaceholderText
  } = (0, _reactNative2.render)( /*#__PURE__*/_react.default.createElement(_testUtils.Wrapper, null, /*#__PURE__*/_react.default.createElement(_index.FormControl, {
    nativeID: inputID,
    isInvalid: true
  }, /*#__PURE__*/_react.default.createElement(_index.FormControl.Label, {
    //@ts-ignore
    ref: _ref => ref = _ref
  }, "Name"), /*#__PURE__*/_react.default.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/_react.default.createElement(_index.FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/_react.default.createElement(_index.FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name'); //@ts-ignore

  expect(textInput.props.nativeID).toBe(ref.htmlFor);
});
//# sourceMappingURL=FormControl.test.js.map