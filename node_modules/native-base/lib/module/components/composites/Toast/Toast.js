function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Overlay } from '../../primitives/Overlay';
import { PresenceTransition } from '../Transitions';
import VStack from '../../primitives/Stack/VStack';
import React, { createContext, useState, useMemo } from 'react';
import { AccessibilityInfo, Platform, SafeAreaView } from 'react-native';
import Box from '../../primitives/Box';
import { usePropsResolution } from '../../../hooks';
import { useKeyboardBottomInset } from '../../../utils';
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
const ToastContext = /*#__PURE__*/createContext({
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
  } = React.useContext(ToastContext);
  const bottomInset = useKeyboardBottomInset() * 2;

  const getPositions = () => {
    return Object.keys(toastInfo);
  };

  let hasToastOnOverlay = false;
  getPositions().map(position => {
    var _toastInfo$position;

    if (((_toastInfo$position = toastInfo[position]) === null || _toastInfo$position === void 0 ? void 0 : _toastInfo$position.length) > 0) hasToastOnOverlay = true;
  });
  return getPositions().length > 0 ? /*#__PURE__*/React.createElement(Overlay, _extends({}, _overlay, {
    isOpen: hasToastOnOverlay,
    isKeyboardDismissable: false
  }), getPositions().map(position => {
    if (Object.keys(POSITIONS).includes(position)) return /*#__PURE__*/React.createElement(VStack, _extends({}, _stack, {
      key: position // @ts-ignore

    }, POSITIONS[position]), // @ts-ignore
    toastInfo[position].map(toast => {
      var _toast$config3;

      return /*#__PURE__*/React.createElement(PresenceTransition, _extends({}, _presenceTransition, {
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
      }), /*#__PURE__*/React.createElement(SafeAreaView, null, /*#__PURE__*/React.createElement(Box, {
        bottom: ['bottom', 'bottom-left', 'bottom-right'].includes(position) && (_toast$config3 = toast.config) !== null && _toast$config3 !== void 0 && _toast$config3.avoidKeyboard ? bottomInset + 'px' : undefined
      }, toast.component)));
    }));else return null;
  })) : null;
};

export const ToastProvider = ({
  children
}) => {
  const [toastInfo, setToastInfo] = useState({});
  const [visibleToasts, setVisibleToasts] = useState({});
  const [themeProps] = useState(usePropsResolution('Toast', {}));
  const toastIndex = React.useRef(1);
  const hideAll = React.useCallback(() => {
    setVisibleToasts({});
  }, [setVisibleToasts]);
  const hideToast = React.useCallback(id => {
    setVisibleToasts(prevVisibleToasts => ({ ...prevVisibleToasts,
      [id]: false
    }));
  }, [setVisibleToasts]);
  const isActive = React.useCallback(id => {
    for (const toastPosition of Object.keys(toastInfo)) {
      const positionArray = toastInfo[toastPosition];
      return positionArray.findIndex(toastData => toastData.id === id) > -1;
    }

    return false;
  }, [toastInfo]);
  const removeToast = React.useCallback(id => {
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
  const setToast = React.useCallback(props => {
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
      React.createElement(VStack, _extends({}, themeProps, rest), /*#__PURE__*/React.createElement(Box, {
        _text: { ...themeProps._title,
          ..._title
        }
      }, title), description && /*#__PURE__*/React.createElement(Box, {
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


    if (accessibilityAnnouncement && Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(accessibilityAnnouncement);
    }

    return id;
  }, [themeProps, toastInfo, visibleToasts, hideToast]);
  const contextValue = React.useMemo(() => {
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
  return /*#__PURE__*/React.createElement(ToastContext.Provider, {
    value: contextValue
  }, children, /*#__PURE__*/React.createElement(CustomToast, {
    _overlay: themeProps._overlay,
    _stack: themeProps._stack,
    _presenceTransition: themeProps._presenceTransition
  }));
};
export const useToast = () => {
  const {
    setToast,
    hideAll,
    isActive,
    hideToast
  } = React.useContext(ToastContext);
  const toast = useMemo(() => ({
    show: setToast,
    close: hideToast,
    closeAll: hideAll,
    isActive
  }), [setToast, hideAll, isActive, hideToast]);
  return toast;
};
export const ToastRef = /*#__PURE__*/React.createRef();
export const Toast = {
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
//# sourceMappingURL=Toast.js.map