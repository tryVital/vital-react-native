"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = exports.Select = void 0;
const Select = {
  baseStyle: () => {
    return {
      selection: {
        start: 0
      },
      _customDropdownIconProps: {
        color: 'muted.500',
        mr: '3',
        size: '6',
        p: '1'
      },
      _hover: {
        borderColor: 'primary.600'
      },
      _focus: {
        borderColor: 'primary.600'
      },
      _disabled: {
        bg: 'muted.100',
        placeholderTextColor: 'muted.700'
      },
      _invalid: {
        borderColor: 'error.600'
      },
      _dark: {
        _customDropdownIconProps: {
          color: 'muted.400',
          mr: '3'
        },
        _hover: {
          borderColor: 'primary.500'
        },
        _focus: {
          borderColor: 'primary.500'
        },
        _disabled: {
          bg: 'muted.800',
          opacity: '80',
          placeholderTextColor: 'text.50'
        },
        _invalid: {
          borderColor: 'error.500'
        }
      },
      _webSelect: {
        style: {
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 1
        }
      },
      _web: {
        pointerEvents: 'none'
      },
      _actionSheetBody: {
        w: '100%'
      },
      _actionSheetContent: {}
    };
  },
  defaultProps: {
    optimized: true
  }
}; // SelectIcon - only for custom variant

exports.Select = Select;
const SelectItem = {
  baseStyle: {
    p: '1',
    px: '2',
    borderRadius: '0',
    minH: '0'
  }
};
exports.SelectItem = SelectItem;
//# sourceMappingURL=select.js.map