"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = exports.ToastRef = exports.useToast = exports.ToastProvider = void 0;

var _Overlay = require("../../primitives/Overlay");

var _Transitions = require("../Transitions");

var _VStack = _interopRequireDefault(require("../../primitives/Stack/VStack"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _hooks = require("../../../hooks");

var _utils = require("../../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const INSET = 50;
const POSITIONS = {
  'top': {
    top: INSET,
    left: 0,
    right: 0
  },
  'top-right': {
    top: INSET,
    right: 0
  },
  'top-left': {
    top: INSET,
    left: 0
  },
  'bottom': {
    bottom: INSET,
    left: 0,
    right: 0
  },
  'bottom-left': {
    bottom: INSET,
    left: 0
  },
  'bottom-right': {
    bottom: INSET,
    right: 0
  }
};
const initialAnimationOffset = 24;
const transitionConfig = {
  'bottom': initialAnimationOffset,
  'top': -initialAnimationOffset,
  'top-right': -initialAnimationOffset,
  'top-left': -initialAnimationOffset,
  'bottom-left': initialAnimationOffset,
  'bottom-right': initialAnimationOffset
};
const ToastContext = /*#__PURE__*/(0, _react.createContext)({
  toastInfo: {},
  setToastInfo: () => {},
  setToast: () => {},
  removeToast: () => {},
  hideAll: () => {},
  isActive: () => false,
  visibleToasts: {},
  setVisibleToasts: () => {},
  hideToast: () => {}
});

const CustomToast = ({
  _overlay,
  _stack,
  _presenceTransition
}) => {
  const {
    toastInfo,
    visibleToasts,
    removeToast
  } = _react.default.useContext(ToastContext);

  const bottomInset = (0, _utils.useKeyboardBottomInset)() * 2;

  const getPositions = () => {
    return Object.keys(toastInfo);
  };

  let hasToastOnOverlay = false;
  getPositions().map(position => {
    var _toastInfo$position;

    if (((_toastInfo$position = toastInfo[position]) === null || _toastInfo$position === void 0 ? void 0 : _toastInfo$position.length) > 0) hasToastOnOverlay = true;
  });
  return getPositions().length > 0 ? /*#__PURE__*/_react.default.createElement(_Overlay.Overlay, _extends({}, _overlay, {
    isOpen: hasToastOnOverlay,
    isKeyboardDismissable: false
  }), getPositions().map(position => {
    if (Object.keys(POSITIONS).includes(position)) return /*#__PURE__*/_react.default.createElement(_VStack.default, _extends({}, _stack, {
      key: position // @ts-ignore

    }, POSITIONS[position]), // @ts-ignore
    toastInfo[position].map(toast => {
      var _toast$config3;

      return /*#__PURE__*/_react.default.createElement(_Transitions.PresenceTransition, _extends({}, _presenceTransition, {
        key: toast.id,
        visible: visibleToasts[toast.id],
        onTransitionComplete: status => {
          if (status === 'exited') {
            var _toast$config, _toast$config2;

            removeToast(toast.id);
            ((_toast$config = toast.config) === null || _toast$config === void 0 ? void 0 : _toast$config.onCloseComplete) && ((_toast$config2 = toast.config) === null || _toast$config2 === void 0 ? void 0 : _toast$config2.onCloseComplete());
          }
        },
        initial: {
          opacity: 0,
          translateY: transitionConfig[position]
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
        bottom: ['bottom', 'bottom-left', 'bottom-right'].includes(position) && (_toast$config3 = toast.config) !== null && _toast$config3 !== void 0 && _toast$config3.avoidKeyboard ? bottomInset + 'px' : undefined
      }, toast.component)));
    }));else return null;
  })) : null;
};

const ToastProvider = ({
  children
}) => {
  const [toastInfo, setToastInfo] = (0, _react.useState)({});
  const [visibleToasts, setVisibleToasts] = (0, _react.useState)({});
  const [themeProps] = (0, _react.useState)((0, _hooks.usePropsResolution)('Toast', {}));

  const toastIndex = _react.default.useRef(1);

  const hideAll = _react.default.useCallback(() => {
    setVisibleToasts({});
  }, [setVisibleToasts]);

  const hideToast = _react.default.useCallback(id => {
    setVisibleToasts(prevVisibleToasts => ({ ...prevVisibleToasts,
      [id]: false
    }));
  }, [setVisibleToasts]);

  const isActive = _react.default.useCallback(id => {
    for (const toastPosition of Object.keys(toastInfo)) {
      const positionArray = toastInfo[toastPosition];
      return positionArray.findIndex(toastData => toastData.id === id) > -1;
    }

    return false;
  }, [toastInfo]);

  const removeToast = _react.default.useCallback(id => {
    setToastInfo(prev => {
      for (const toastPosition of Object.keys(prev)) {
        const positionArray = prev[toastPosition];
        const isToastPresent = positionArray.findIndex(toastData => toastData.id === id) > -1;

        if (isToastPresent) {
          const newPositionArray = positionArray.filter(item => item.id !== id);
          const temp = {};
          temp[toastPosition] = newPositionArray;
          const newToastInfo = { ...prev,
            ...temp
          };
          return newToastInfo;
        }
      }

      return prev;
    });
  }, [setToastInfo]);

  const setToast = _react.default.useCallback(props => {
    const {
      placement = 'bottom',
      title,
      render,
      id = toastIndex.current++,
      description,
      duration = 5000,
      _title,
      _description,
      accessibilityAnnouncement,
      // @ts-ignore
      avoidKeyboard = false,
      //eslint-disable-line
      ...rest
    } = props;
    let positionToastArray = toastInfo[placement];
    if (!positionToastArray) positionToastArray = [];
    let component = null;

    if (render) {
      component = render({
        id
      });
    } else {
      component =
      /*#__PURE__*/
      // Below VStack is the default component where all the direct props spread.
      _react.default.createElement(_VStack.default, _extends({}, themeProps, rest), /*#__PURE__*/_react.default.createElement(_Box.default, {
        _text: { ...themeProps._title,
          ..._title
        }
      }, title), description && /*#__PURE__*/_react.default.createElement(_Box.default, {
        _text: { ...themeProps._description,
          ..._description
        }
      }, description));
    }

    toastInfo[placement] = [...positionToastArray, {
      component,
      id,
      config: props
    }];
    setToastInfo({ ...toastInfo
    });
    setVisibleToasts({ ...visibleToasts,
      [id]: true
    });

    if (duration !== null) {
      setTimeout(function () {
        hideToast(id);
      }, duration);
    } // iOS doesn't support accessibilityLiveRegion


    if (accessibilityAnnouncement && _reactNative.Platform.OS === 'ios') {
      _reactNative.AccessibilityInfo.announceForAccessibility(accessibilityAnnouncement);
    }

    return id;
  }, [themeProps, toastInfo, visibleToasts, hideToast]);

  const contextValue = _react.default.useMemo(() => {
    return {
      toastInfo,
      setToastInfo,
      setToast,
      removeToast,
      hideAll,
      isActive,
      visibleToasts,
      setVisibleToasts,
      hideToast
    };
  }, [toastInfo, setToastInfo, setToast, removeToast, hideAll, isActive, visibleToasts, setVisibleToasts, hideToast]);

  return /*#__PURE__*/_react.default.createElement(ToastContext.Provider, {
    value: contextValue
  }, children, /*#__PURE__*/_react.default.createElement(CustomToast, {
    _overlay: themeProps._overlay,
    _stack: themeProps._stack,
    _presenceTransition: themeProps._presenceTransition
  }));
};

exports.ToastProvider = ToastProvider;

const useToast = () => {
  const {
    setToast,
    hideAll,
    isActive,
    hideToast
  } = _react.default.useContext(ToastContext);

  const toast = (0, _react.useMemo)(() => ({
    show: setToast,
    close: hideToast,
    closeAll: hideAll,
    isActive
  }), [setToast, hideAll, isActive, hideToast]);
  return toast;
};

exports.useToast = useToast;

const ToastRef = /*#__PURE__*/_react.default.createRef();

exports.ToastRef = ToastRef;
const Toast = {
  show: props => {
    var _ToastRef$current;

    return (_ToastRef$current = ToastRef.current) === null || _ToastRef$current === void 0 ? void 0 : _ToastRef$current.show(props);
  },
  close: id => {
    var _ToastRef$current2;

    return (_ToastRef$current2 = ToastRef.current) === null || _ToastRef$current2 === void 0 ? void 0 : _ToastRef$current2.close(id);
  },
  closeAll: () => {
    var _ToastRef$current3;

    return (_ToastRef$current3 = ToastRef.current) === null || _ToastRef$current3 === void 0 ? void 0 : _ToastRef$current3.closeAll();
  },
  isActive: id => {
    var _ToastRef$current4;

    return (_ToastRef$current4 = ToastRef.current) === null || _ToastRef$current4 === void 0 ? void 0 : _ToastRef$current4.isActive(id);
  }
};
exports.Toast = Toast;
//# sourceMappingURL=Toast.js.map