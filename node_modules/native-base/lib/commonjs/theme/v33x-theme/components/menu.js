"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = exports.MenuGroup = exports.default = void 0;

var _reactNative = require("react-native");

var _tools = require("../tools");

function baseStyle(props) {
  return {
    bg: (0, _tools.mode)("#fff", "gray.700")(props),
    py: 2,
    borderWidth: 1,
    borderColor: (0, _tools.mode)("coolGray.200", "gray.600")(props),
    borderRadius: 'sm',
    _presenceTransition: {
      initial: {
        opacity: 0,
        translateY: -10
      },
      animate: {
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 200
        }
      },
      exit: {
        opacity: 0,
        translateY: -10,
        transition: {
          duration: 150
        }
      },
      style: _reactNative.StyleSheet.absoluteFill
    },
    _overlay: {},
    _backdrop: {
      bg: 'transparent'
    }
  };
}

var _default = {
  baseStyle
};
exports.default = _default;
const MenuGroup = {
  baseStyle: props => ({
    _title: {
      fontSize: 'xs',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: (0, _tools.mode)("gray.500", "gray.300")(props)
    },
    p: 3
  })
};
exports.MenuGroup = MenuGroup;
const MenuItem = {
  baseStyle: props => ({
    px: 3,
    py: 2,
    outlineWidth: _reactNative.Platform.OS === 'web' ? 0 : undefined,
    _stack: {
      alignItems: 'center',
      px: 3,
      space: 3
    },
    _disabled: {
      _text: {
        color: (0, _tools.mode)('gray.400', 'gray.400')(props)
      }
    },
    _focus: {
      bg: (0, _tools.mode)("coolGray.200", "gray.600")(props)
    },
    _pressed: {
      bg: (0, _tools.mode)("coolGray.300", "gray.500")(props)
    },
    _icon: {
      size: 4,
      color: (0, _tools.mode)('gray.500', 'gray.100')(props),
      opacity: 0
    },
    _checked: {
      _icon: {
        opacity: 1
      }
    }
  }),
  defaultProps: {}
};
exports.MenuItem = MenuItem;
//# sourceMappingURL=menu.js.map