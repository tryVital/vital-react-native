"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClipboard = useClipboard;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useClipboard() {
  const [hasCopied, setHasCopied] = _react.default.useState(false);

  const [value, setValue] = _react.default.useState('');

  const onCopy = async copiedValue => {
    if (_reactNative.Clipboard) {
      await _reactNative.Clipboard.setString(copiedValue);
    }

    setValue(copiedValue);
    setHasCopied(true);
  };

  return {
    value,
    onCopy,
    hasCopied
  };
}
//# sourceMappingURL=useClipboard.js.map