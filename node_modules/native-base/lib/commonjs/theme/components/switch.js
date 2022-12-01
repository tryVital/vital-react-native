"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const baseStyle = props => {
  const {
    colorScheme: c
  } = props;
  return {
    _disabled: {
      opacity: 0.4
    },
    _invalid: {
      borderColor: 'error.600',
      borderWidth: 2,
      borderRadius: 12
    },
    onThumbColor: 'muted.50',
    offThumbColor: 'muted.50',
    offTrackColor: 'muted.300',
    onTrackColor: "".concat(c, ".600"),
    _hover: {
      offTrackColor: 'muted.400',
      onTrackColor: "".concat(c, ".700")
    },
    _dark: {
      offTrackColor: 'muted.700',
      onTrackColor: "".concat(c, ".500"),
      _hover: {
        offTrackColor: 'muted.600',
        onTrackColor: "".concat(c, ".400")
      },
      _invalid: {
        borderColor: 'error.500'
      }
    }
  };
};

const sizes = {
  sm: {
    style: {
      transform: [{
        scale: 0.75
      }]
    }
  },
  md: {},
  lg: {
    style: {
      transform: [{
        scale: 1.25
      }]
    },
    margin: 1
  }
};
const defaultProps = {
  size: 'md',
  colorScheme: 'primary'
};
var _default = {
  baseStyle,
  sizes,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=switch.js.map