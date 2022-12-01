function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { FormControl, useFormControl } from '../index';
import { TextInput } from 'react-native';
import { render } from '@testing-library/react-native';
import { Wrapper } from '../../../../utils/test-utils';
const Input = /*#__PURE__*/React.forwardRef((props, ref) => {
  const inputProps = useFormControl(props);
  return (
    /*#__PURE__*/
    //@ts-ignore
    React.createElement(TextInput, _extends({
      ref: ref
    }, inputProps))
  );
});
it('a11y test in when required', async () => {
  let {
    getByPlaceholderText
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: "name",
    isRequired: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, null, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/React.createElement(FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityRequired).toBe(true);
  expect(textInput.props.required).toBe(true);
});
it('a11y test in when invalid', async () => {
  let {
    getByPlaceholderText
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: "name",
    isInvalid: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, null, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/React.createElement(FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityInvalid).toBe(true);
});
it('a11y test in when readOnly', async () => {
  let {
    getByPlaceholderText
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: "name",
    isReadOnly: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, null, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/React.createElement(FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.accessibilityReadOnly).toBe(true);
  expect(textInput.props.readOnly).toBe(true);
});
it('a11y test in when disabled', async () => {
  let {
    getByPlaceholderText
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: "name",
    isDisabled: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, null, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/React.createElement(FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name');
  expect(textInput.props.disabled).toBe(true);
});
it('a11y test when helper text is present', async () => {
  let {
    getByPlaceholderText
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: "name",
    isDisabled: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, null, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"))));
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
  } = render( /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(FormControl, {
    nativeID: inputID,
    isInvalid: true
  }, /*#__PURE__*/React.createElement(FormControl.Label, {
    //@ts-ignore
    ref: _ref => ref = _ref
  }, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement(FormControl.HelperText, null, "Enter your name please!"), /*#__PURE__*/React.createElement(FormControl.ErrorMessage, null, "Your name is invalid"))));
  const textInput = getByPlaceholderText('Name'); //@ts-ignore

  expect(textInput.props.nativeID).toBe(ref.htmlFor);
});
//# sourceMappingURL=FormControl.test.js.map