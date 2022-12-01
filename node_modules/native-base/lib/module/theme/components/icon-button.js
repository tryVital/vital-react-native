const baseStyle = props => {
  const {
    colorScheme
  } = props;
  const colors = props.theme.colors;
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
    _focus: {
      borderColor: "".concat(colorScheme, ".400")
    },
    _focusVisible: {
      _web: {
        style: {
          outlineWidth: '2px',
          outlineColor: "".concat(colors[colorScheme][600]),
          outlineStyle: 'solid'
        }
      }
    },
    _loading: {
      opacity: '40'
    },
    _disabled: {
      opacity: '40'
    },
    _dark: {
      _focusVisible: {
        _web: {
          style: {
            outlineWidth: '2px',
            outlineColor: "".concat(colors[colorScheme][500]),
            outlineStyle: 'solid'
          }
        }
      }
    }
  };
};

function variantGhost({
  colorScheme
}) {
  return {
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      bg: "".concat(colorScheme, ".600:alpha.10")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".600:alpha.20")
    },
    _dark: {
      _icon: {
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
    borderColor: "".concat(colorScheme, ".600"),
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      bg: "".concat(colorScheme, ".700"),
      _icon: {
        color: 'muted.50'
      }
    },
    _pressed: {
      bg: "".concat(colorScheme, ".800"),
      _icon: {
        color: 'muted.50'
      }
    },
    _focus: {
      bg: "".concat(colorScheme, ".600"),
      _icon: {
        color: 'muted.50'
      }
    },
    _dark: {
      borderColor: "".concat(colorScheme, ".500"),
      _icon: {
        color: "".concat(colorScheme, ".500")
      },
      _hover: {
        bg: "".concat(colorScheme, ".400"),
        _icon: {
          color: 'muted.900'
        }
      },
      _pressed: {
        bg: "".concat(colorScheme, ".300"),
        _icon: {
          color: 'muted.900'
        }
      },
      _focus: {
        bg: "".concat(colorScheme, ".500"),
        _icon: {
          color: 'muted.900'
        }
      }
    }
  };
}

function variantSolid({
  colorScheme
}) {
  return {
    bg: "".concat(colorScheme, ".600"),
    _hover: {
      bg: "".concat(colorScheme, ".700")
    },
    _pressed: {
      bg: "".concat(colorScheme, ".800")
    },
    _icon: {
      color: 'muted.50'
    },
    _dark: {
      bg: "".concat(colorScheme, ".500"),
      _hover: {
        bg: "".concat(colorScheme, ".400")
      },
      _pressed: {
        bg: "".concat(colorScheme, ".300"),
        _icon: {
          color: 'muted.900'
        }
      },
      _icon: {
        color: 'muted.900'
      }
    }
  };
}

function variantSubtle({
  colorScheme
}) {
  return {
    _text: {
      color: "".concat(colorScheme, ".900")
    },
    _icon: {
      color: "".concat(colorScheme, ".900")
    },
    bg: "".concat(colorScheme, ".100"),
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
    _spinner: {
      color: "".concat(colorScheme, ".600")
    },
    _icon: {
      color: "".concat(colorScheme, ".600")
    },
    _hover: {
      _icon: {
        color: "".concat(colorScheme, ".700")
      }
    },
    _pressed: {
      _icon: {
        color: "".concat(colorScheme, ".800")
      }
    },
    _dark: {
      _icon: {
        color: "".concat(colorScheme, ".500")
      },
      _hover: {
        _icon: {
          color: "".concat(colorScheme, ".400")
        }
      },
      _pressed: {
        _icon: {
          color: "".concat(colorScheme, ".300")
        }
      }
    }
  };
}

function variantUnstyled() {
  return {
    _icon: {
      color: 'muted.900'
    },
    _dark: {
      _icon: {
        color: 'muted.50'
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
  unstyled: variantUnstyled
};
const sizes = {
  lg: {
    p: '3',
    _icon: {
      size: 'lg'
    }
  },
  md: {
    p: '2.5',
    _icon: {
      size: 'md'
    }
  },
  sm: {
    p: '2',
    _icon: {
      size: 'sm'
    }
  },
  xs: {
    p: '1.5',
    _icon: {
      size: 'xs'
    }
  }
};
const defaultProps = {
  variant: 'ghost',
  size: 'md',
  colorScheme: 'primary'
};
export default {
  baseStyle,
  variants,
  sizes,
  defaultProps
};
//# sourceMappingURL=icon-button.js.map