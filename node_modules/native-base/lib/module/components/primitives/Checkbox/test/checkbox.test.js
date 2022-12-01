import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from '../../../../core/NativeBaseProvider';
import { Checkbox } from '..';
import { Text } from '../..';

function CheckBoxGroup() {
  const [groupValue, setGroupValue] = React.useState(['Item 1 ', 'Item 3 ']);
  return /*#__PURE__*/React.createElement(Checkbox.Group, {
    colorScheme: "green",
    defaultValue: groupValue,
    onChange: values => {
      setGroupValue(values || []);
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    value: "Item 1 "
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Item 1")), /*#__PURE__*/React.createElement(Checkbox, {
    value: "Item 2 "
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Item 2")), /*#__PURE__*/React.createElement(Checkbox, {
    value: "Item 3 "
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Item 3")), /*#__PURE__*/React.createElement(Checkbox, {
    colorScheme: "orange",
    value: "Indeterminate Item "
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Indeterminate Item")));
}

function CheckBox(group) {
  const [groupValues, setGroupValues] = React.useState([]);
  return group ? /*#__PURE__*/React.createElement(Checkbox.Group, {
    onChange: setGroupValues,
    value: groupValues
  }, /*#__PURE__*/React.createElement(Checkbox, {
    value: "one"
  }, /*#__PURE__*/React.createElement(Text, null, "One")), /*#__PURE__*/React.createElement(Checkbox, {
    value: "two",
    isIndeterminate: true,
    onChange: () => setGroupValues([...groupValues, 'two'])
  }, /*#__PURE__*/React.createElement(Text, null, "Two"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Checkbox, {
    value: "one",
    onChange: () => {
      setGroupValues([...groupValues, 'one']);
    }
  }, /*#__PURE__*/React.createElement(Text, null, "One")), /*#__PURE__*/React.createElement(Checkbox, {
    value: "two",
    isIndeterminate: true,
    onChange: () => setGroupValues([...groupValues, 'two'])
  }, /*#__PURE__*/React.createElement(Text, null, "Two")));
}

describe('CheckBoxGroup', () => {
  it('handles defaults and onChange on checkBoxGroup', () => {
    const {
      getAllByRole
    } = render( /*#__PURE__*/React.createElement(NativeBaseProvider, {
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
    }, /*#__PURE__*/React.createElement(CheckBoxGroup, null)));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
    expect(checkbox[1].props.accessibilityState.checked).toBe(false);
    expect(checkbox[2].props.accessibilityState.checked).toBe(true);
    expect(checkbox[3].props.accessibilityState.checked).toBe(false);
    fireEvent.press(checkbox[1]);
    expect(checkbox[1].props.accessibilityState.checked).toBe(true);
  });
  it('can be disabled on checkBox', () => {
    const {
      getAllByRole
    } = render( /*#__PURE__*/React.createElement(NativeBaseProvider, {
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
    }, /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 1 "
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 1")), /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 2 ",
      isDisabled: true
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 2")), /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 3 "
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 3")), /*#__PURE__*/React.createElement(Checkbox, {
      colorScheme: "orange",
      value: "Indeterminate Item "
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Indeterminate Item"))));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[1].props.accessibilityState.disabled).toBe(true);
  });
  it('is checked on checkBox', () => {
    const {
      getAllByRole
    } = render( /*#__PURE__*/React.createElement(NativeBaseProvider, {
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
    }, /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 1 ",
      isChecked: true
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 1")), /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 2 ",
      isDisabled: true
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 2")), /*#__PURE__*/React.createElement(Checkbox, {
      value: "Item 3 "
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Item 3")), /*#__PURE__*/React.createElement(Checkbox, {
      colorScheme: "orange",
      value: "Indeterminate Item "
    }, /*#__PURE__*/React.createElement(Text, {
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
    } = render( /*#__PURE__*/React.createElement(NativeBaseProvider, {
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
    }, /*#__PURE__*/React.createElement(CheckBox, null)));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(2);
    fireEvent.press(checkbox[0]);
    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
  });
});
//# sourceMappingURL=checkbox.test.js.map