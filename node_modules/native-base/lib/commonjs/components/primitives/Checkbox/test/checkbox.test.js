"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _NativeBaseProvider = require("../../../../core/NativeBaseProvider");

var _ = require("..");

var _2 = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheckBoxGroup() {
  const [groupValue, setGroupValue] = _react.default.useState(['Item 1 ', 'Item 3 ']);

  return /*#__PURE__*/_react.default.createElement(_.Checkbox.Group, {
    colorScheme: "green",
    defaultValue: groupValue,
    onChange: values => {
      setGroupValue(values || []);
    }
  }, /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "Item 1 "
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Item 1")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "Item 2 "
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Item 2")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "Item 3 "
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Item 3")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    colorScheme: "orange",
    value: "Indeterminate Item "
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Indeterminate Item")));
}

function CheckBox(group) {
  const [groupValues, setGroupValues] = _react.default.useState([]);

  return group ? /*#__PURE__*/_react.default.createElement(_.Checkbox.Group, {
    onChange: setGroupValues,
    value: groupValues
  }, /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "one"
  }, /*#__PURE__*/_react.default.createElement(_2.Text, null, "One")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "two",
    isIndeterminate: true,
    onChange: () => setGroupValues([...groupValues, 'two'])
  }, /*#__PURE__*/_react.default.createElement(_2.Text, null, "Two"))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "one",
    onChange: () => {
      setGroupValues([...groupValues, 'one']);
    }
  }, /*#__PURE__*/_react.default.createElement(_2.Text, null, "One")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
    value: "two",
    isIndeterminate: true,
    onChange: () => setGroupValues([...groupValues, 'two'])
  }, /*#__PURE__*/_react.default.createElement(_2.Text, null, "Two")));
}

describe('CheckBoxGroup', () => {
  it('handles defaults and onChange on checkBoxGroup', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
      initialWindowMetrics: {
        frame: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        insets: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }, /*#__PURE__*/_react.default.createElement(CheckBoxGroup, null)));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
    expect(checkbox[1].props.accessibilityState.checked).toBe(false);
    expect(checkbox[2].props.accessibilityState.checked).toBe(true);
    expect(checkbox[3].props.accessibilityState.checked).toBe(false);

    _reactNative.fireEvent.press(checkbox[1]);

    expect(checkbox[1].props.accessibilityState.checked).toBe(true);
  });
  it('can be disabled on checkBox', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
      initialWindowMetrics: {
        frame: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        insets: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 1 "
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 1")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 2 ",
      isDisabled: true
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 2")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 3 "
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 3")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      colorScheme: "orange",
      value: "Indeterminate Item "
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Indeterminate Item"))));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[1].props.accessibilityState.disabled).toBe(true);
  });
  it('is checked on checkBox', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
      initialWindowMetrics: {
        frame: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        insets: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 1 ",
      isChecked: true
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 1")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 2 ",
      isDisabled: true
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 2")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      value: "Item 3 "
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Item 3")), /*#__PURE__*/_react.default.createElement(_.Checkbox, {
      colorScheme: "orange",
      value: "Indeterminate Item "
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Indeterminate Item"))));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
  });
  /****   inDeterminant is not yet implemented in checkbox ****/
  // it('inDeterminant on checkBoxGroup', () => {
  //   const { getAllByRole } = render(
  //     <NativeBaseProvider
  //       initialWindowMetrics={{
  //         frame: { x: 0, y: 0, width: 0, height: 0 },
  //         insets: { top: 0, left: 0, right: 0, bottom: 0 },
  //       }}
  //     >
  //       <CheckBox group={true} />
  //     </NativeBaseProvider>
  //   );
  //   const checkbox = getAllByRole('checkbox');
  //   expect(checkbox.length).toBe(2);
  //   expect(checkbox[1].props.accessibilityState.checked).toBe('mixed');
  // });
  // it('inDeterminant on checkBox', () => {
  //   const { getAllByRole } = render(
  //     <NativeBaseProvider
  //       initialWindowMetrics={{
  //         frame: { x: 0, y: 0, width: 0, height: 0 },
  //         insets: { top: 0, left: 0, right: 0, bottom: 0 },
  //       }}
  //     >
  //       <CheckBox group={false} />
  //     </NativeBaseProvider>
  //   );
  //   const checkbox = getAllByRole('checkbox');
  //   expect(checkbox.length).toBe(2);
  //   fireEvent.press(checkbox[1]);
  //   expect(checkbox[1].props.accessibilityState.checked).toBe('mixed');
  // });

  it('onChange on checkBox', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
      initialWindowMetrics: {
        frame: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        insets: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }, /*#__PURE__*/_react.default.createElement(CheckBox, null)));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(2);

    _reactNative.fireEvent.press(checkbox[0]);

    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
  });
});
//# sourceMappingURL=checkbox.test.js.map