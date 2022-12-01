const baseStyle = props => {
  const {
    primary
  } = props.theme.colors;
  return {
    _focusVisible: {
      _web: {
        style: {
          outlineWidth: 0,
          boxShadow: "".concat(primary[400], " 0px 0px 0px 2px")
        }
      }
    },
    _dark: {
      _focusVisible: {
        _web: {
          style: {
            outlineWidth: 0,
            boxShadow: "".concat(primary[500], " 0px 0px 0px 2px")
          }
        }
      }
    }
  };
};

export default {
  baseStyle,
  defaultProps: {}
};
//# sourceMappingURL=pressable.js.map