const baseStyle = props => {
  const {
    isUnderlined
  } = props;
  return {
    _text: {
      textDecorationLine: isUnderlined ? 'underline' : 'none'
    },
    width: 'auto',
    height: 'auto'
  };
};

export default {
  baseStyle,
  defaultProps: {
    isUnderlined: true
  }
};
//# sourceMappingURL=link.js.map