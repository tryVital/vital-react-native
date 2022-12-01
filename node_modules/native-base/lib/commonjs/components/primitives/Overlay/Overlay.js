"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = Overlay;

var _overlays = require("@react-native-aria/overlays");

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../../hooks");

var _ExitAnimationContext = require("./ExitAnimationContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */
function Overlay({
  children,
  isOpen,
  useRNModal = false,
  useRNModalOnAndroid = false,
  isKeyboardDismissable = true,
  //@ts-ignore
  animationPreset = 'fade',
  onRequestClose,
  style,
  unmountOnExit
}) {
  const [exited, setExited] = _react.default.useState(!isOpen);

  (0, _hooks.useKeyboardDismissable)({
    enabled: isOpen && isKeyboardDismissable,
    callback: onRequestClose ? onRequestClose : () => {}
  });
  const styleObj = { ...style
  };

  if (animationPreset === 'slide') {
    styleObj.overflow = 'hidden';
    styleObj.display = 'flex';
  } else {
    styleObj.display = exited && !isOpen ? 'none' : 'flex';
  }

  if (unmountOnExit && !isOpen && exited) {
    return null;
  }

  if (useRNModal || useRNModalOnAndroid && _reactNative.Platform.OS === 'android') {
    return /*#__PURE__*/_react.default.createElement(_ExitAnimationContext.ExitAnimationContext.Provider, {
      value: {
        exited,
        setExited
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
      statusBarTranslucent: true,
      transparent: true,
      visible: isOpen,
      onRequestClose: onRequestClose,
      animationType: animationPreset
    }, children));
  }

  if (unmountOnExit && !isOpen && exited) {
    return null;
  }

  return (
    /*#__PURE__*/
    //@ts-ignore
    _react.default.createElement(_overlays.OverlayContainer, {
      style: { ...styleObj
      }
    }, /*#__PURE__*/_react.default.createElement(_ExitAnimationContext.ExitAnimationContext.Provider, {
      value: {
        exited,
        setExited
      }
    }, children))
  );
}
//# sourceMappingURL=Overlay.js.map