"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ButtonGroup = void 0;

var _tools = require("../tools");

var _reactNative = require("react-native");

const disabledTextColor = props => (0, _tools.mode)("muted.500", "muted.300")(props);

const baseStyle = props => {
  const {
    primary
  } = props.theme.colors;
  const focusRing = _reactNative.Platform.OS === 'web' ? (0, _tools.mode)({
    boxShadow: "".concat(primary[400], " 0px 0px 0px 2px"),
    zIndex: 1
  }, {
    boxShadow: "".concat(primary[500], " 0px 0px 0px 2px"),
    zIndex: 1
  })(props) : {};
  return {
    borderRadius: 'sm',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    _web: {
      cursor: props.isDisabled ? 'not-allowed' : props.isLoading ? 'default' : 'pointer'
    },
    _text: {
      fontWeight: 'medium'
    },
    _focusVisible: {
      style: props.variant !== 'unstyled' ? { ...focusRing
      } : {}
    },
    _stack: {
      space: 2,
      alignItems: 'center'
    },
    _loading: {
      opacity: '80'
    },
    _disabled: {
      opacity: '50'
    },
    _spinner: {
      size: 'sm',
      focusable: false
    }
  };
};

function variantGhost(props) {
  const {
    colorScheme: c
  } = props;

  if (c === 'muted') {
    return {
      _text: {
        color: disabledTextColor(props)
      }
    };
  }

  return {
    _text: {
      color: props.isDisabled ? disabledTextColor(props) : (0, _tools.mode)("".concat(c, ".500"), "".concat(c, ".300"))(props)
    },
    bg: 'transparent',
    _web: {
      outlineWidth: '0'
    },
    _hover: {
      borderColor: (0, _tools.mode)("".concat(c, ".500"), "".concat(c, ".200"))(props),
      bg: (0, _tools.transparentize)((0, _tools.mode)("".concat(c, ".200"), "".concat(c, ".400"))(props), 0.5)(props.theme)
    },
    _focusVisible: {
      borderColor: (0, _tools.mode)("".concat(c, ".700"), "".concat(c, ".200"))(props),
      bg: (0, _tools.transparentize)((0, _tools.mode)("".concat(c, ".200"), "".concat(c, ".400"))(props), 0.5)(props.theme)
    },
    _pressed: {
      borderColor: (0, _tools.mode)("".concat(c, ".600"), "".concat(c, ".200"))(props),
      bg: (0, _tools.transparentize)((0, _tools.mode)("".concat(c, ".300"), "".concat(c, ".500"))(props), 0.5)(props.theme)
    },
    _spinner: {
      size: 'sm'
    }
  };
}

function variantOutline(props) {
  const {
    colorScheme: c
  } = props;
  const borderColor = (0, _tools.mode)("muted.200", "muted.500")(props);
  return {
    borderWidth: '1',
    borderColor: c === 'muted' ? borderColor : props.isDisabled ? disabledTextColor(props) : (0, _tools.mode)("".concat(c, ".300"), "".concat(c, ".300"))(props),
    ...variantGhost(props)
  };
}

function variantSolid(props) {
  const {
    colorScheme: c
  } = props;
  let bg = "".concat(c, ".500");

  if (props.isDisabled) {
    bg = (0, _tools.mode)("muted.300", "muted.500")(props);
  }

  const styleObject = {
    _web: {
      outlineWidth: '0'
    },
    bg,
    _hover: {
      bg: "".concat(c, ".600")
    },
    _pressed: {
      bg: "".concat(c, ".700")
    },
    _focus: {
      bg: "".concat(c, ".600")
    },
    _loading: {
      bg: (0, _tools.mode)("warmGray.50", "".concat(c, ".300"))(props),
      opacity: '50'
    },
    _disabled: {
      bg: (0, _tools.mode)("trueGray.300", "trueGray.600")(props)
    }
  };
  return styleObject;
} // function getBg(props: Record<string, any>) {
//   const { theme, status, variant } = props;
//   let { colorScheme } = props;
//   colorScheme = getColorScheme(
//     props,
//     colorScheme !== 'primary' ? colorScheme : status
//   );
//   const lightBg =
//     variant === 'solid'
//       ? getColor(theme, `${colorScheme}.400`, colorScheme)
//       : getColor(theme, `${colorScheme}.100`, colorScheme);
//   const darkBg =
//     variant === 'solid'
//       ? getColor(theme, `${colorScheme}.700`, colorScheme)
//       : getColor(theme, `${colorScheme}.400`, colorScheme);
//   return mode(lightBg, darkBg)(props);
// }


function variantSubtle(props) {
  const {
    colorScheme: c
  } = props;
  let bg = "".concat(c, ".100");
  bg = (0, _tools.mode)(bg, "".concat(c, ".200"))(props);
  let color;

  if (props.isDisabled) {
    bg = (0, _tools.mode)("muted.300", "muted.500")(props);
  } else {
    color = (0, _tools.mode)("".concat(c, ".500"), "".concat(c, ".600"))(props);
  }

  const styleObject = {
    _text: {
      color: color
    },
    _web: {
      outlineWidth: '0'
    },
    bg,
    _hover: {
      _text: {
        color: (0, _tools.mode)("".concat(c, ".600"), "".concat(c, ".700"))(props)
      },
      bg: (0, _tools.mode)("".concat(c, ".200"), "".concat(c, ".300"))(props)
    },
    _pressed: {
      _text: {
        color: (0, _tools.mode)("".concat(c, ".700"), "".concat(c, ".800"))(props)
      },
      bg: (0, _tools.mode)("".concat(c, ".300"), "".concat(c, ".400"))(props)
    }
  };
  return styleObject;
}

function variantLink(props) {
  const {
    colorScheme: c
  } = props;
  return { ...variantGhost(props),
    _text: {
      textDecorationLine: _reactNative.Platform.select({
        ios: 'underline',
        web: 'underline'
      }),
      color: c === 'muted' ? (0, _tools.mode)("muted.800", "".concat(c, ".200"))(props) : props.isDisabled ? disabledTextColor(props) : (0, _tools.mode)("".concat(c, ".500"), "".concat(c, ".300"))(props)
    },
    _hover: {
      _text: {
        color: (0, _tools.mode)("".concat(c, ".600"), "".concat(c, ".400"))(props),
        textDecorationLine: 'underline'
      }
    },
    _focusVisible: {
      _text: {
        color: (0, _tools.mode)("".concat(c, ".600"), "".concat(c, ".400"))(props),
        textDecorationLine: 'underline'
      }
    },
    _pressed: {
      _text: {
        color: (0, _tools.mode)("".concat(c, ".700"), "".concat(c, ".500"))(props)
      }
    }
  };
}

function variantUnstyled() {
  return {};
}

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  subtle: variantSubtle,
  link: variantLink,
  unstyled: variantUnstyled
};
const sizes = {
  lg: {
    px: '4',
    py: '2',
    _text: {
      fontSize: 'md'
    }
  },
  md: {
    px: '3',
    py: '2',
    _text: {
      fontSize: 'sm'
    }
  },
  sm: {
    px: '2',
    py: '2',
    _text: {
      fontSize: 'xs'
    }
  },
  xs: {
    px: '2',
    py: '2',
    _text: {
      fontSize: '2xs'
    }
  }
};
const defaultProps = {
  variant: 'solid',
  size: 'md',
  colorScheme: 'primary'
};
const ButtonGroup = {
  baseStyle: {
    direction: 'row'
  },
  defaultProps: {
    space: 2
  }
};
exports.ButtonGroup = ButtonGroup;
var _default = {
  baseStyle,
  variants,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=button.js.map