"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScreenReaderEnabled = useScreenReaderEnabled;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useScreenReaderEnabled() {
  const [enabled, setEnabled] = _react.default.useState(false);

  const mountedRef = _react.default.useRef(false);

  const handleSetEnabled = value => {
    if (mountedRef.current) {
      setEnabled(value);
    }
  };

  _react.default.useEffect(() => {
    mountedRef.current = true;

    async function setInitialValue() {
      const res = await _reactNative.AccessibilityInfo.isScreenReaderEnabled();
      handleSetEnabled(res);
    }

    let handler = _reactNative.AccessibilityInfo.addEventListener('screenReaderChanged', event => {
      handleSetEnabled(event);
    });

    setInitialValue();
    return () => {
      mountedRef.current = false;

      _reactNative.AccessibilityInfo.removeEventListener('screenReaderChanged', handler);
    };
  });

  return enabled;
}
//# sourceMappingURL=useScreenReaderEnabled.js.map