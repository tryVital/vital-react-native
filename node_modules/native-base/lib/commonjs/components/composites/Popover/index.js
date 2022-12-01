"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = void 0;

var _Popover = _interopRequireDefault(require("./Popover"));

var _PopoverContent = require("./PopoverContent");

var _PopoverBody = _interopRequireDefault(require("./PopoverBody"));

var _PopoverCloseButton = _interopRequireDefault(require("./PopoverCloseButton"));

var _PopoverFooter = _interopRequireDefault(require("./PopoverFooter"));

var _PopoverHeader = _interopRequireDefault(require("./PopoverHeader"));

var _PopoverArrow = _interopRequireDefault(require("./PopoverArrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverTemp = _Popover.default;
PopoverTemp.Content = _PopoverContent.PopoverContent;
PopoverTemp.CloseButton = _PopoverCloseButton.default;
PopoverTemp.Header = _PopoverHeader.default;
PopoverTemp.Footer = _PopoverFooter.default;
PopoverTemp.Body = _PopoverBody.default;
PopoverTemp.Arrow = _PopoverArrow.default; // To add typings

const Popover = PopoverTemp;
exports.Popover = Popover;
//# sourceMappingURL=index.js.map