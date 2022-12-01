"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../tools");

const baseStyle = props => {
  const {
    colorScheme,
    theme
  } = props;
  return {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 'sm',
    borderColor: (0, _tools.mode)('muted.300', 'muted.600')(props),
    bg: (0, _tools.mode)('muted.50', 'muted.700')(props),
    // matching background color
    opacity: 1,
    _web: {
      cursor: 'pointer'
    },
    _stack: {
      direction: 'row',
      alignItems: 'center',
      space: 2,
      _web: {
        cursor: props.isDisabled ? 'not-allowed' : 'pointer'
      }
    },
    _text: {
      ml: 2,
      color: (0, _tools.mode)('darkText', 'lightText')(props)
    },
    _interactionBox: {
      position: 'absolute',
      borderRadius: 'full',
      p: 5,
      w: '100%',
      h: '100%',
      zIndex: -1,
      _web: {
        transition: 'height 200ms, width 200ms',
        pointerEvents: 'none'
      }
    },
    _hover: {
      _interactionBox: {
        bg: (0, _tools.transparentize)('muted.200', 0.3)(theme)
      }
    },
    _focus: {
      _interactionBox: {
        bg: (0, _tools.transparentize)("".concat(colorScheme, ".200"), 0.5)(theme)
      }
    },
    _focusVisible: {
      _interactionBox: {
        bg: (0, _tools.transparentize)("".concat(colorScheme, ".200"), 0.5)(theme)
      }
    },
    _disabled: {
      _interactionBox: {
        bg: 'transparent'
      },
      _web: {
        cursor: 'not-allowed'
      },
      opacity: 0.4
    },
    _pressed: {
      _interactionBox: {
        bg: (0, _tools.transparentize)("".concat(colorScheme, ".200"), 0.5)(theme)
      }
    },
    _checked: {
      borderColor: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".200"))(props),
      bg: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".300"))(props)
    },
    _invalid: {
      borderColor: (0, _tools.mode)('error.600', 'error.400')(props)
    },
    _icon: {
      color: (0, _tools.mode)("muted.50", "muted.800")(props) // matching background color

    }
  };
};

const sizes = {
  lg: {
    _icon: {
      size: 6
    },
    _text: {
      fontSize: 'xl'
    }
  },
  md: {
    _icon: {
      size: 5
    },
    _text: {
      fontSize: 'lg'
    }
  },
  sm: {
    _icon: {
      size: 4
    },
    _text: {
      fontSize: 'md'
    }
  }
};
const defaultProps = {
  defaultIsChecked: false,
  size: 'sm',
  colorScheme: 'primary'
};
var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=checkbox.js.map