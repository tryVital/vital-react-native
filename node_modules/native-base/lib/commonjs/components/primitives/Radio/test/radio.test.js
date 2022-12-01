"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _ = require("..");

var _2 = require("../..");

var _NativeBaseProvider = require("../../../../core/NativeBaseProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadiosGroup() {
  const [, setValue] = _react.default.useState('one');

  return /*#__PURE__*/_react.default.createElement(_.Radio.Group, {
    defaultValue: "1",
    name: "myRadioGroup",
    onChange: nextValue => {
      setValue(nextValue);
    }
  }, /*#__PURE__*/_react.default.createElement(_.Radio, {
    value: "1"
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "First")), /*#__PURE__*/_react.default.createElement(_.Radio, {
    value: "2"
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Second")), /*#__PURE__*/_react.default.createElement(_.Radio, {
    value: "3"
  }, /*#__PURE__*/_react.default.createElement(_2.Text, {
    mx: 2
  }, "Third")));
}

describe('RadioGroup', () => {
  it('onChange and default on RadioGroup', () => {
    let {
      getAllByRole,
      getByText
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
    }, /*#__PURE__*/_react.default.createElement(RadiosGroup, null)));
    let radios = getAllByRole('radio');
    expect(radios.length).toBe(3);
    expect(radios[0].props.accessibilityState.checked).toBe(true);
    expect(radios[1].props.accessibilityState.checked).toBe(false);
    expect(radios[2].props.accessibilityState.checked).toBe(false);
    let second = getByText('Second');

    _reactNative.fireEvent.press(second);

    expect(radios[0].props.accessibilityState.checked).toBe(false);
  });
  it('can be disabled', () => {
    let {
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
    }, /*#__PURE__*/_react.default.createElement(_.Radio.Group, {
      defaultValue: "1",
      name: "myRadioGroup"
    }, /*#__PURE__*/_react.default.createElement(_.Radio, {
      value: "1"
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "First")), /*#__PURE__*/_react.default.createElement(_.Radio, {
      value: "2",
      isDisabled: true
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Second")), /*#__PURE__*/_react.default.createElement(_.Radio, {
      value: "3"
    }, /*#__PURE__*/_react.default.createElement(_2.Text, {
      mx: 2
    }, "Third")))));
    let second = getAllByRole('radio');
    expect(second[1].props.accessibilityState.disabled).toBe(true);
  });
});
//# sourceMappingURL=radio.test.js.map