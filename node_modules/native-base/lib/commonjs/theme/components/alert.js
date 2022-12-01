"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertIcon = exports.Alert = void 0;

var _tools = require("../tools");

function getBg(props) {
  const {
    theme,
    colorScheme: c,
    status,
    variant
  } = props;
  const colorScheme = (0, _tools.getColorScheme)(props, !status ? c : status);
  const lightBg = variant === 'solid' ? (0, _tools.getColor)(theme, "".concat(colorScheme, ".700"), colorScheme) : (0, _tools.getColor)(theme, "".concat(colorScheme, ".200"), colorScheme);
  const darkBg = variant === 'solid' ? (0, _tools.getColor)(theme, "".concat(colorScheme, ".600"), colorScheme) : (0, _tools.getColor)(theme, "".concat(colorScheme, ".200"), colorScheme);
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
  colorScheme = (0, _tools.getColorScheme)(props, !status ? colorScheme : status);
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
  colorScheme = (0, _tools.getColorScheme)(props, !status ? colorScheme : status);
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
  colorScheme = (0, _tools.getColorScheme)(props, !status ? colorScheme : status);
  return {
    borderWidth: 1,
    _icon: {
      color: "".concat(colorScheme, ".700")
    },
    borderColor: (0, _tools.transparentize)("".concat(colorScheme, ".700"), 0.4)(theme),
    _dark: {
      _icon: {
        color: "".concat(colorScheme, ".600")
      },
      borderColor: (0, _tools.transparentize)("".concat(colorScheme, ".600"), 0.4)(theme)
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
  colorScheme = (0, _tools.getColorScheme)(props, !status ? colorScheme : status);
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
  colorScheme = (0, _tools.getColorScheme)(props, !status ? colorScheme : status);
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
const Alert = {
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

exports.Alert = Alert;
const AlertIcon = {
  baseStyle: {
    size: 4
  }
};
exports.AlertIcon = AlertIcon;
//# sourceMappingURL=alert.js.map