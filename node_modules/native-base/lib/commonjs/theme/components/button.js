"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ButtonGroup = void 0;

const baseStyle = props => {
  const {
    primary
  } = props.theme.colors;
  return {
    borderRadius: 'sm',
    // '4px'
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    _web: {
      _disabled: {
        cursor: 'not-allowed'
      },
      _loading: {
        cursor: 'not-allowed'
      },
      cursor: 'pointer',
      userSelect: 'none'
    },
    _focusVisible: {
      _web: {
        outlineWidth: '0',
        style: {
          boxShadow: "".concat(primary[400], " 0px 0px 0px 2px")
        }
      }
    },
    _dark: {
      _focusVisible: {
        _web: {
          outlineWidth: '0',
          style: {
            boxShadow: "".concat(primary[500], " 0px 0px 0px 2px")
          }
        }
      }
    },
    _stack: {
      space: '1.5',
      alignItems: 'center'
    },
    _loading: {
      opacity: '40'
    },
    _disabled: {
      opacity: '40'
    },
    _spinner: {
      size: 'sm',
      focusable: false
    }
  };
};

function variantGhost({
  colorScheme
}) {
  return {
    _text: {
      color: "".concat(colorScheme, ".600")
    },
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _spinner: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      bg: "".concat(colorScheme, ".600:alpha.10")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".600:alpha.20")
    },
    _dark: {
      _text: {
        color: "".concat(colorScheme, ".500")
      },
      _icon: {
        color: "".concat(colorScheme, ".500")
      },
      _spinner: {
        color: "".concat(colorScheme, ".500")
      },
      _hover: {
        bg: "".concat(colorScheme, ".500:alpha.10")
      },
      _pressed: {
        bg: "".concat(colorScheme, ".500:alpha.20")
      }
    }
  };
}

function variantOutline({
  colorScheme
}) {
  return {
    borderWidth: '1px',
    borderColor: 'muted.300',
    _text: {
      color: "".concat(colorScheme, ".600")
    },
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _spinner: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      bg: "".concat(colorScheme, ".600:alpha.10")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".600:alpha.20")
    },
    _dark: {
      borderColor: 'muted.700',
      _text: {
        color: "".concat(colorScheme, ".500")
      },
      _icon: {
        color: "".concat(colorScheme, ".500")
      },
      _spinner: {
        color: "".concat(colorScheme, ".500")
      },
      _hover: {
        bg: "".concat(colorScheme, ".500:alpha.10")
      },
      _pressed: {
        bg: "".concat(colorScheme, ".500:alpha.20")
      }
    }
  };
}

function variantSolid({
  colorScheme
}) {
  return {
    _text: {
      color: 'text.50'
    },
    _icon: {
      color: 'text.50'
    },
    _spinner: {
      color: 'text.50'
    },
    bg: "".concat(colorScheme, ".600"),
    _hover: {
      bg: "".concat(colorScheme, ".700")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".800")
    },
    _dark: {
      bg: "".concat(colorScheme, ".600"),
      _hover: {
        bg: "".concat(colorScheme, ".700")
      },
      _pressed: {
        bg: "".concat(colorScheme, ".800")
      }
    }
  };
}

function variantSubtle({
  colorScheme
}) {
  return {
    bg: "".concat(colorScheme, ".100"),
    _text: {
      color: "".concat(colorScheme, ".900")
    },
    _icon: {
      color: "".concat(colorScheme, ".900")
    },
    _spinner: {
      color: "".concat(colorScheme, ".900")
    },
    _hover: {
      bg: "".concat(colorScheme, ".200")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".300")
    },
    _dark: {
      bg: "".concat(colorScheme, ".300"),
      _hover: {
        bg: "".concat(colorScheme, ".200")
      },
      _pressed: {
        bg: "".concat(colorScheme, ".100")
      }
    }
  };
}

function variantLink({
  colorScheme
}) {
  return {
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _spinner: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      _text: {
        textDecorationLine: 'underline'
      }
    },
    _pressed: {
      _text: {
        color: "".concat(colorScheme, ".800"),
        textDecorationLine: 'underline'
      }
    },
    _text: {
      color: "".concat(colorScheme, ".600")
    },
    _dark: {
      _text: {
        color: "".concat(colorScheme, ".500")
      },
      _pressed: {
        _text: {
          color: "".concat(colorScheme, ".300")
        }
      }
    }
  };
}

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  subtle: variantSubtle,
  link: variantLink,
  unstyled: {}
};
const sizes = {
  lg: {
    px: '3',
    py: '3',
    _text: {
      fontSize: 'md'
    },
    _icon: {
      size: 'md'
    }
  },
  md: {
    px: '3',
    py: '2.5',
    _text: {
      fontSize: 'sm'
    },
    _icon: {
      size: 'sm'
    }
  },
  sm: {
    px: '3',
    py: '2',
    _text: {
      fontSize: 'xs'
    },
    _icon: {
      size: 'sm'
    }
  },
  xs: {
    px: '3',
    py: '2',
    _text: {
      fontSize: '2xs'
    },
    _icon: {
      size: 'xs'
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