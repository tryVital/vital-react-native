"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AccordionContext", {
  enumerable: true,
  get: function () {
    return _Context.AccordionContext;
  }
});
Object.defineProperty(exports, "AccordionItemContext", {
  enumerable: true,
  get: function () {
    return _Context.AccordionItemContext;
  }
});
exports.Accordion = void 0;

var _Accordion = _interopRequireDefault(require("./Accordion"));

var _AccordionItem = _interopRequireDefault(require("./AccordionItem"));

var _AccordionSummary = _interopRequireDefault(require("./AccordionSummary"));

var _AccordionDetails = _interopRequireDefault(require("./AccordionDetails"));

var _AccordionIcon = _interopRequireDefault(require("./AccordionIcon"));

var _Context = require("./Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AccordionTemp = _Accordion.default;
AccordionTemp.Item = _AccordionItem.default;
AccordionTemp.Summary = _AccordionSummary.default;
AccordionTemp.Details = _AccordionDetails.default;
AccordionTemp.Icon = _AccordionIcon.default; // To add typings

const Accordion = AccordionTemp;
exports.Accordion = Accordion;
//# sourceMappingURL=index.js.map