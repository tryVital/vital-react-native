"use strict";

var _react = _interopRequireDefault(require("react"));

var _useBreakpointValue = require("../../hooks/useBreakpointValue");

var _NativeBaseProvider = require("../../core/NativeBaseProvider");

var _reactHooks = require("@testing-library/react-hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('useBreakpointValue', () => {
  const wrapper = ({
    children
  }) => /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
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
  }, children);

  test('Empty array', () => {
    const {
      result
    } = (0, _reactHooks.renderHook)(() => (0, _useBreakpointValue.useBreakpointValue)([]), {
      wrapper
    });
    expect(result.current).toEqual([]);
  });
  test('Empty object', () => {
    const {
      result
    } = (0, _reactHooks.renderHook)(() => (0, _useBreakpointValue.useBreakpointValue)({}), {
      wrapper
    });
    expect(result.current).toEqual(undefined);
  });
  test('Basic array', () => {
    const {
      result
    } = (0, _reactHooks.renderHook)(() => (0, _useBreakpointValue.useBreakpointValue)([1, 2, 3]), {
      wrapper
    });
    expect(result.current).toEqual(2);
  });
  test('Basic Object', () => {
    const {
      result
    } = (0, _reactHooks.renderHook)(() => (0, _useBreakpointValue.useBreakpointValue)({
      base: 0,
      sm: 1,
      md: 2
    }), {
      wrapper
    });
    expect(result.current).toEqual(1);
  });
});
//# sourceMappingURL=useBreakpointValue.test.js.map