import AccordionMain from './Accordion';
import { default as AccordionItem } from './AccordionItem';
import { default as AccordionSummary } from './AccordionSummary';
import { default as AccordionDetails } from './AccordionDetails';
import { default as AccordionIcon } from './AccordionIcon';
const AccordionTemp = AccordionMain;
AccordionTemp.Item = AccordionItem;
AccordionTemp.Summary = AccordionSummary;
AccordionTemp.Details = AccordionDetails;
AccordionTemp.Icon = AccordionIcon; // To add typings

const Accordion = AccordionTemp;
export { Accordion };
export { AccordionContext } from './Context';
export { AccordionItemContext } from './Context';
//# sourceMappingURL=index.js.map