import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Radio } from '..';
import { Text } from '../..';
import { NativeBaseProvider } from '../../../../core/NativeBaseProvider';

function RadiosGroup() {
  const [, setValue] = React.useState('one');
  return /*#__PURE__*/React.createElement(Radio.Group, {
    defaultValue: "1",
    name: "myRadioGroup",
    onChange: nextValue => {
      setValue(nextValue);
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    value: "1"
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "First")), /*#__PURE__*/React.createElement(Radio, {
    value: "2"
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Second")), /*#__PURE__*/React.createElement(Radio, {
    value: "3"
  }, /*#__PURE__*/React.createElement(Text, {
    mx: 2
  }, "Third")));
}

describe('RadioGroup', () => {
  it('onChange and default on RadioGroup', () => {
    let {
      getAllByRole,
      getByText
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
    }, /*#__PURE__*/React.createElement(RadiosGroup, null)));
    let radios = getAllByRole('radio');
    expect(radios.length).toBe(3);
    expect(radios[0].props.accessibilityState.checked).toBe(true);
    expect(radios[1].props.accessibilityState.checked).toBe(false);
    expect(radios[2].props.accessibilityState.checked).toBe(false);
    let second = getByText('Second');
    fireEvent.press(second);
    expect(radios[0].props.accessibilityState.checked).toBe(false);
  });
  it('can be disabled', () => {
    let {
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
    }, /*#__PURE__*/React.createElement(Radio.Group, {
      defaultValue: "1",
      name: "myRadioGroup"
    }, /*#__PURE__*/React.createElement(Radio, {
      value: "1"
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "First")), /*#__PURE__*/React.createElement(Radio, {
      value: "2",
      isDisabled: true
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Second")), /*#__PURE__*/React.createElement(Radio, {
      value: "3"
    }, /*#__PURE__*/React.createElement(Text, {
      mx: 2
    }, "Third")))));
    let second = getAllByRole('radio');
    expect(second[1].props.accessibilityState.disabled).toBe(true);
  });
});
//# sourceMappingURL=radio.test.js.map