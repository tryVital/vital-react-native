"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverFooter = exports.PopoverArrow = exports.PopoverHeader = exports.PopoverContent = exports.PopoverBody = exports.PopoverCloseButton = void 0;

var _tools = require("../tools");

const PopoverCloseButton = {
  baseStyle: props => ({
    position: 'absolute',
    right: 3,
    top: 3,
    zIndex: 1,
    colorScheme: 'coolGray',
    p: 2,
    _icon: {
      size: 3,
      color: (0, _tools.mode)('coolGray.600', 'coolGray.100')(props)
    }
  })
};
exports.PopoverCloseButton = PopoverCloseButton;
const PopoverBody = {
  baseStyle: props => ({
    pt: '2',
    p: '3',
    _text: {
      color: (0, _tools.mode)('coolGray.600', 'coolGray.300')(props)
    }
  })
};
exports.PopoverBody = PopoverBody;
const PopoverContent = {
  baseStyle: props => ({
    backgroundColor: (0, _tools.mode)('coolGray.50', 'gray.700')(props),
    borderColor: (0, _tools.mode)('coolGray.200', 'coolGray.600')(props),
    _text: {
      color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props)
    },
    borderWidth: 1,
    rounded: 'md',
    overflow: 'hidden'
  })
};
exports.PopoverContent = PopoverContent;
const PopoverHeader = {
  baseStyle: props => ({
    _web: {
      accessibilityRole: 'header'
    },
    py: '4',
    px: '3',
    borderBottomWidth: '1',
    borderColor: (0, _tools.mode)('coolGray.200', 'gray.600')(props),
    _text: {
      fontSize: 'md',
      fontWeight: 'semibold',
      color: (0, _tools.mode)('coolGray.800', 'warmGray.50')(props),
      lineHeight: 'sm'
    }
  })
};
exports.PopoverHeader = PopoverHeader;
const PopoverArrow = {
  baseStyle: props => ({
    borderColor: (0, _tools.mode)('coolGray.200', 'coolGray.600')(props)
  })
};
exports.PopoverArrow = PopoverArrow;
const PopoverFooter = {
  baseStyle: props => {
    return {
      p: '3',
      bg: (0, _tools.mode)('coolGray.100', 'gray.600')(props),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    };
  }
};
exports.PopoverFooter = PopoverFooter;
//# sourceMappingURL=popover.js.map