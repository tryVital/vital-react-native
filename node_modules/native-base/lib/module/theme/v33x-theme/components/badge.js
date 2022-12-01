import { mode, getColorScheme } from '../tools';
const baseStyle = {
  px: '2',
  py: '0.5',
  alignItems: 'center',
  _text: {
    fontSize: 'xs',
    fontWeight: 'medium'
  }
};

function variantSolid(props) {
  const colorScheme = getColorScheme(props);
  return {
    bg: mode("".concat(colorScheme, ".600"), "".concat(colorScheme, ".300"))(props),
    _text: {
      color: mode("coolGray.100", "coolGray.800")(props)
    },
    borderWidth: '1',
    borderColor: 'transparent',
    borderRadius: '2'
  };
}

function variantSubtle(props) {
  const colorScheme = getColorScheme(props);
  return {
    bg: mode("".concat(colorScheme, ".200"), "".concat(colorScheme, ".700"))(props),
    _text: {
      color: mode("".concat(colorScheme, ".600"), "".concat(colorScheme, ".200"))(props)
    },
    borderWidth: '1',
    borderRadius: '2',
    borderColor: 'transparent'
  };
}

function variantOutline(props) {
  const colorScheme = getColorScheme(props);
  return {
    borderColor: mode("".concat(colorScheme, ".500"), "".concat(colorScheme, ".400"))(props),
    _text: {
      color: mode("".concat(colorScheme, ".500"), "".concat(colorScheme, ".400"))(props)
    },
    borderRadius: '2',
    borderWidth: '1'
  };
}

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline
};
const defaultProps = {
  variant: 'subtle',
  colorScheme: 'coolGray'
};
export default {
  baseStyle,
  variants,
  defaultProps
};
//# sourceMappingURL=badge.js.map