"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalOverlay = exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.ModalCloseButton = exports.ModalContent = exports.Modal = void 0;

var _reactNative = require("react-native");

var _tools = require("../tools");

const sizes = {
  xs: {
    contentSize: {
      width: '60%',
      maxWidth: '280'
    }
  },
  sm: {
    contentSize: {
      width: '65%',
      maxWidth: '320'
    }
  },
  md: {
    contentSize: {
      width: '75%',
      maxWidth: '380'
    }
  },
  lg: {
    contentSize: {
      width: '80%',
      maxWidth: '520'
    }
  },
  xl: {
    contentSize: {
      width: '90%',
      maxWidth: '580'
    }
  },
  full: {
    contentSize: {
      width: '100%'
    }
  }
};
const Modal = {
  baseStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    _web: {
      pointerEvents: 'box-none'
    },
    _backdropFade: {
      exitDuration: 150,
      entryDuration: 200
    },
    _slide: {
      overlay: false,
      duration: 200
    },
    _fade: {
      exitDuration: 100,
      entryDuration: 200
    }
  },
  sizes,
  defaultProps: {
    size: 'md',
    closeOnOverlayClick: true
  }
};
exports.Modal = Modal;
const ModalContent = {
  baseStyle: props => {
    return {
      bg: (0, _tools.mode)('coolGray.50', 'gray.700')(props),
      _text: {
        color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props)
      },
      shadow: 1,
      rounded: 'lg',
      maxHeight: "".concat(_reactNative.Dimensions.get('window').height - 150, "px"),
      overflow: 'hidden'
    };
  }
};
exports.ModalContent = ModalContent;
const ModalCloseButton = {
  baseStyle: props => {
    return {
      position: 'absolute',
      right: '3',
      top: '3',
      zIndex: '1',
      colorScheme: 'coolGray',
      p: '2',
      _icon: {
        size: '3',
        color: (0, _tools.mode)('coolGray.600', 'coolGray.100')(props)
      }
    };
  }
};
exports.ModalCloseButton = ModalCloseButton;
const ModalHeader = {
  baseStyle: props => {
    return {
      py: '4',
      px: '3',
      borderBottomWidth: '1',
      borderColor: (0, _tools.mode)('coolGray.200', 'gray.600')(props),
      _text: {
        fontSize: 'md',
        fontWeight: 'semibold',
        color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props),
        lineHeight: 'sm'
      }
    };
  }
};
exports.ModalHeader = ModalHeader;
const ModalBody = {
  baseStyle: props => {
    return {
      pt: '2',
      p: '3',
      _text: {
        color: (0, _tools.mode)('coolGray.600', 'coolGray.300')(props)
      }
    };
  }
};
exports.ModalBody = ModalBody;
const ModalFooter = {
  baseStyle: props => {
    return {
      p: '3',
      bg: (0, _tools.mode)('coolGray.100', 'gray.600')(props),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    };
  }
};
exports.ModalFooter = ModalFooter;
const ModalOverlay = {
  baseStyle: {
    position: 'absolute',
    left: '0',
    top: '0',
    opacity: '50',
    right: '0',
    bottom: '0'
  }
};
exports.ModalOverlay = ModalOverlay;
//# sourceMappingURL=modal.js.map