"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _overlays = require("@react-native-aria/overlays");

var _react = _interopRequireDefault(require("react"));

var _Backdrop = _interopRequireDefault(require("../Backdrop"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Drawer = ({
  children,
  isOpen,
  onClose,
  placement = 'right'
}) => {
  const placementStyles = _react.default.useMemo(() => {
    const styles = {
      position: 'absolute'
    };

    if (placement === 'top') {
      styles.top = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = '100%';
    } else if (placement === 'bottom') {
      styles.bottom = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = '100%';
    } else if (placement === 'right') {
      styles.right = 0;
      styles.top = 0;
      styles.bottom = 0;
      styles.height = '100%';
    } else {
      styles.top = 0;
      styles.bottom = 0;
      styles.left = 0;
      styles.height = '100%';
    }

    return styles;
  }, [placement]);

  if (!isOpen) return null;
  return /*#__PURE__*/_react.default.createElement(_overlays.OverlayContainer, null, /*#__PURE__*/_react.default.createElement(_Backdrop.default, {
    onPress: onClose ? onClose : () => {}
  }), /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, placementStyles, {
    opacity: 1
  }), children));
};

var _default = Drawer;
exports.default = _default;
//# sourceMappingURL=index.js.map