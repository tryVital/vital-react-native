"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _NativeBaseProvider = require("../../../../core/NativeBaseProvider");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.useFakeTimers();
describe('Switch', () => {
  it('can be default checked', () => {
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
    }, /*#__PURE__*/_react.default.createElement(_index.default, {
      defaultIsChecked: true
    })));
    let switches = getAllByRole('switch');
    expect(switches[0].props.value).toBe(true);
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
    }, /*#__PURE__*/_react.default.createElement(_index.default, {
      isDisabled: true
    })));
    let switches = getAllByRole('switch');
    expect(switches[0].props.disabled).toBe(true);
  });
});
//# sourceMappingURL=switch.test.js.map