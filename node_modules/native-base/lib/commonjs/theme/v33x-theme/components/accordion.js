"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionDetails = exports.AccordionSummary = exports.AccordionIcon = exports.AccordionItem = exports.Accordion = void 0;

var _colors = require("../tools/colors");

// Accordion
const accordionBaseStyle = props => {
  return {
    borderWidth: 1,
    borderColor: (0, _colors.mode)('gray.300', 'gray.600')(props),
    borderRadius: 'lg'
  };
};

const Accordion = {
  baseStyle: accordionBaseStyle
}; // AccordionItem

exports.Accordion = Accordion;
const AccordionItem = {}; // AccordionIcon

exports.AccordionItem = AccordionItem;
const AccordionIcon = {}; // AccordionSummary

exports.AccordionIcon = AccordionIcon;

const accordionSummaryBaseStyle = props => {
  return {
    borderTopWidth: 1,
    borderTopColor: (0, _colors.mode)('gray.300', 'gray.600')(props),
    p: 3,
    _hover: {
      bg: (0, _colors.mode)('primary.200', 'primary.300')(props)
    },
    _expanded: {
      bg: 'primary.600',
      borderBottomColor: (0, _colors.mode)('gray.300', 'gray.600')(props),
      _text: {
        color: 'white'
      }
    },
    _disabled: {
      bg: (0, _colors.mode)('gray.200', 'gray.700')(props)
    }
  };
};

const AccordionSummary = {
  baseStyle: accordionSummaryBaseStyle
}; // AccordionDetails

exports.AccordionSummary = AccordionSummary;
const accordionPanelBaseStyle = {
  p: 3
};
const AccordionDetails = {
  baseStyle: accordionPanelBaseStyle
};
exports.AccordionDetails = AccordionDetails;
//# sourceMappingURL=accordion.js.map