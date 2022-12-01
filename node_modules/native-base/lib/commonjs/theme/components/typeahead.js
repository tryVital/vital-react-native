"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeAheadSearchItem = void 0;

var _colors = require("../tools/colors");

const typeaheadSearchItemBaseStyle = props => {
  return {
    backgroundColor: (0, _colors.mode)('gray.100', 'gray.600')(props),
    _focus: {
      backgroundColor: (0, _colors.mode)('primary.300', 'primary.700')(props)
    },
    _disabled: {
      backgroundColor: 'gray.200'
    }
  };
};

const TypeAheadSearchItem = {
  baseStyle: typeaheadSearchItemBaseStyle
};
exports.TypeAheadSearchItem = TypeAheadSearchItem;
//# sourceMappingURL=typeahead.js.map