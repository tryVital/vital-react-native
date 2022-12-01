import { mode } from '../tools'; // TextField

const baseStyle = props => {
  return {
    _errorMessageProps: {
      mt: 1,
      ml: 3,
      fontSize: 'xs',
      color: 'error.400'
    },
    _helperTextProps: {
      mt: 1,
      ml: 3,
      fontSize: 'xs',
      color: mode('muted.400', 'muted.500')(props)
    }
  };
};

export const TextField = {
  baseStyle,
  defaultProps: {
    component: 'input'
  }
};
//# sourceMappingURL=textField.js.map