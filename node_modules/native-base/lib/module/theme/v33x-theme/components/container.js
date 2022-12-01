const baseStyle = props => {
  const {
    centerContent
  } = props;
  return {
    maxWidth: '80%',
    alignItems: centerContent ? 'center' : 'flex-start',
    _text: {
      textAlign: centerContent ? 'center' : 'left'
    }
  };
};

export default {
  baseStyle
};
//# sourceMappingURL=container.js.map