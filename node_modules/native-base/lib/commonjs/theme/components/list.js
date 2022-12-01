"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListIcon = exports.ListItem = exports.List = void 0;

var _tools = require("../tools");

// List
const List = {
  baseStyle: props => {
    return {
      py: 2,
      borderWidth: 1,
      borderColor: 'gray.300',
      _hover: {
        bg: (0, _tools.mode)('primary.100', 'primary.700')(props)
      }
    };
  }
}; // ListItem

exports.List = List;
const ListItem = {
  baseStyle: {
    // borderTopWidth: 1,
    py: 2,
    borderColor: 'gray.300'
  },
  defaultProps: {
    start: 1
  }
}; // ListIcon

exports.ListItem = ListItem;
const ListIcon = {
  baseStyle: {
    mr: 8,
    size: 'md'
  }
};
exports.ListIcon = ListIcon;
//# sourceMappingURL=list.js.map