"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _hooks = require("../../../hooks");

var _Context = require("./Context");

var _reactNative = require("react-native");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ModalContent = (props, ref) => {
  const resolvedProps = (0, _hooks.usePropsResolution)('ModalContent', props);

  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose,
    visible
  } = _react.default.useContext(_Context.ModalContext);

  _react.default.useEffect(() => {
    const finalRefVal = finalFocusRef ? finalFocusRef.current : null;

    if (visible) {
      if (initialFocusRef && initialFocusRef.current) {
        //@ts-ignore
        initialFocusRef.current.focus();
      }
    } else {
      if (finalRefVal) {
        //@ts-ignore
        finalRefVal.focus();
      }
    }
  }, [initialFocusRef, finalFocusRef, visible]); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, contentSize, resolvedProps, {
    ref: ref,
    onAccessibilityEscape: handleClose //@ts-ignore - web only
    ,
    "aria-modal": "true" //@ts-ignore - web only
    ,
    accessibilityRole: _reactNative.Platform.OS === 'web' ? 'dialog' : undefined,
    accessibilityViewIsModal: true,
    _web: {
      focusable: false
    }
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(ModalContent));

exports.default = _default;
//# sourceMappingURL=ModalContent.js.map