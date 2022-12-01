"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsheetItem = exports.ActionsheetContent = exports.Actionsheet = void 0;

var _tools = require("../tools");

// Actionsheet
const Actionsheet = {
  defaultProps: {
    size: 'full',
    justifyContent: 'flex-end',
    animationPreset: 'slide'
  }
}; // ActionsheetContent

exports.Actionsheet = Actionsheet;
const ActionsheetContent = {
  baseStyle: props => ({
    alignItems: 'center',
    px: 2,
    py: 2,
    borderRadius: 'none',
    roundedTop: 20,
    _dragIndicator: {
      bg: (0, _tools.mode)('gray.400', 'gray.400')(props),
      height: 1,
      width: 10,
      borderRadius: 2
    },
    _dragIndicatorWrapper: {
      pt: 3,
      pb: 3,
      mt: -2,
      width: '100%',
      alignItems: 'center',
      collapsable: false
    },
    _dragIndicatorWrapperOffSet: {
      py: 2,
      collapsable: false
    }
  })
}; // ActionsheetItem

exports.ActionsheetContent = ActionsheetContent;
const ActionsheetItem = {
  baseStyle: props => ({
    width: '100%',
    justifyContent: 'flex-start',
    p: 4,
    _text: {
      fontSize: 16,
      fontWeight: 'normal',
      color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props)
    },
    _pressed: {
      bg: (0, _tools.mode)('coolGray.300', 'gray.600')(props)
    },
    _hover: {
      bg: (0, _tools.mode)('coolGray.200', 'gray.500')(props)
    }
  }),
  defaultProps: {
    variant: 'unstyled'
  }
};
exports.ActionsheetItem = ActionsheetItem;
//# sourceMappingURL=actionsheet.js.map