import { getColor, getColorScheme, transparentize } from '../tools';

function getBg(props) {
  const {
    theme,
    colorScheme: c,
    status,
    variant
  } = props;
  const colorScheme = getColorScheme(props, !status ? c : status);
  const lightBg = variant === 'solid' ? getColor(theme, "".concat(colorScheme, ".700"), colorScheme) : getColor(theme, "".concat(colorScheme, ".200"), colorScheme);
  const darkBg = variant === 'solid' ? getColor(theme, "".concat(colorScheme, ".600"), colorScheme) : getColor(theme, "".concat(colorScheme, ".200"), colorScheme);
  return {
    lightBg,
    darkBg
  };
}

const variantSubtle = props => {
  let {
    colorScheme,
    status
  } = props;
  const {
    lightBg,
    darkBg
  } = getBg(props);
  colorScheme = getColorScheme(props, !status ? colorScheme : status);
  return {
    bg: lightBg,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    _dark: {
      bg: darkBg,
      _icon: {
        color: "".concat(colorScheme, ".600")
      }
    }
  };
};

const variantOutline = props => {
  let {
    colorScheme,
    status
  } = props;
  colorScheme = getColorScheme(props, !status ? colorScheme : status);
  return {
    borderWidth: 1,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    borderColor: "".concat(colorScheme, ".700"),
    _dark: {
      _icon: {
        color: "".concat(colorScheme, ".600")
      },
      borderColor: "".concat(colorScheme, ".600")
    }
  };
};

const variantOutlineLight = props => {
  let {
    colorScheme,
    status,
    theme
  } = props;
  colorScheme = getColorScheme(props, !status ? colorScheme : status);
  return {
    borderWidth: 1,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    borderColor: transparentize("".concat(colorScheme, ".700"), 0.4)(theme),
    _dark: {
      _icon: {
        color: "".concat(colorScheme, ".600")
      },
      borderColor: transparentize("".concat(colorScheme, ".600"), 0.4)(theme)
    }
  };
};

const variantSolid = props => {
  const {
    lightBg,
    darkBg
  } = getBg(props);
  return {
    bg: lightBg,
    _dark: {
      bg: darkBg
    },
    _icon: {
      color: "muted.50"
    }
  };
};

const variantLeftAccent = props => {
  let {
    colorScheme,
    status
  } = props;
  const {
    lightBg,
    darkBg
  } = getBg(props);
  colorScheme = getColorScheme(props, !status ? colorScheme : status);
  return {
    borderLeftWidth: 4,
    bg: lightBg,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    borderLeftColor: "".concat(colorScheme, ".700"),
    _dark: {
      bg: darkBg,
      _icon: {
        color: "".concat(colorScheme, ".600")
      },
      borderLeftColor: "".concat(colorScheme, ".600")
    }
  };
};

const variantTopAccent = props => {
  let {
    colorScheme,
    status
  } = props;
  const {
    lightBg,
    darkBg
  } = getBg(props);
  colorScheme = getColorScheme(props, !status ? colorScheme : status);
  return {
    borderTopWidth: 4,
    bg: lightBg,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    borderTopColor: "".concat(colorScheme, ".700"),
    _dark: {
      bg: darkBg,
      _icon: {
        color: "".concat(colorScheme, ".600")
      },
      borderTopColor: "".concat(colorScheme, ".600")
    }
  };
};

const variants = {
  'subtle': variantSubtle,
  'solid': variantSolid,
  'left-accent': variantLeftAccent,
  'top-accent': variantTopAccent,
  'outline': variantOutline,
  'outline-light': variantOutlineLight
};
export const Alert = {
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    p: 3,
    space: 3,
    borderRadius: 'sm'
  },
  variants,
  defaultProps: {
    colorScheme: 'info',
    variant: 'subtle'
  }
}; // AlertIcon

export const AlertIcon = {
  baseStyle: {
    size: 4
  }
};
//# sourceMappingURL=alert.js.map