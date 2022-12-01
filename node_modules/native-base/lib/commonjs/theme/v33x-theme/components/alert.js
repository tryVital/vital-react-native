"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertIcon = exports.Alert = void 0;

var _tools = require("../tools");

function getBg(props) {
  let {
    theme,
    colorScheme,
    status,
    variant
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  const lightBg = variant === 'solid' ? (0, _tools.getColor)(theme, "".concat(colorScheme, ".600"), colorScheme) : (0, _tools.getColor)(theme, "".concat(colorScheme, ".100"), colorScheme);
  const darkBg = variant === 'solid' ? (0, _tools.getColor)(theme, "".concat(colorScheme, ".700"), colorScheme) : (0, _tools.getColor)(theme, "".concat(colorScheme, ".200"), colorScheme);
  return (0, _tools.mode)(lightBg, darkBg)(props);
}

const variantSubtle = props => {
  let {
    colorScheme,
    status
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  return {
    bg: getBg(props),
    _icon: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props)
    }
  };
};

const variantOutline = props => {
  let {
    colorScheme,
    status
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  return {
    borderWidth: 1,
    borderColor: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props),
    _icon: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props)
    }
  };
};

const variantOutlineLight = props => {
  let {
    colorScheme,
    status,
    theme
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  return {
    borderWidth: 1,
    borderColor: (0, _tools.transparentize)((0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".500"))(props), 0.2)(theme),
    _icon: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".200"))(props)
    }
  };
};

const variantSolid = props => {
  return {
    borderWidth: 6,
    borderColor: 'transparent',
    bg: getBg(props),
    _icon: {
      color: (0, _tools.mode)("coolGray.50", "warmGray.50")(props)
    }
  };
};

const variantLeftAccent = props => {
  let {
    colorScheme,
    status
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  return {
    borderWidth: 4,
    bg: getBg(props),
    _icon: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props)
    },
    borderColor: 'transparent',
    borderLeftColor: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props)
  };
};

const variantTopAccent = props => {
  let {
    colorScheme,
    status
  } = props;
  colorScheme = (0, _tools.getColorScheme)(props, colorScheme !== 'primary' ? colorScheme : status);
  return {
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props),
    bg: getBg(props),
    _icon: {
      color: (0, _tools.mode)("".concat(colorScheme, ".600"), "".concat(colorScheme, ".700"))(props)
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
    colorScheme: 'primary',
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