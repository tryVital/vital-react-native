import { default as PopoverMain } from './Popover';
import { PopoverContent } from './PopoverContent';
import PopoverBody from './PopoverBody';
import PopoverCloseButton from './PopoverCloseButton';
import PopoverFooter from './PopoverFooter';
import PopoverHeader from './PopoverHeader';
import PopoverArrow from './PopoverArrow';
const PopoverTemp = PopoverMain;
PopoverTemp.Content = PopoverContent;
PopoverTemp.CloseButton = PopoverCloseButton;
PopoverTemp.Header = PopoverHeader;
PopoverTemp.Footer = PopoverFooter;
PopoverTemp.Body = PopoverBody;
PopoverTemp.Arrow = PopoverArrow; // To add typings

const Popover = PopoverTemp;
export { Popover };
//# sourceMappingURL=index.js.map