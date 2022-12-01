import ActionsheetMain from './Actionsheet';
import ActionsheetItem from './ActionsheetItem'; // import ActionsheetHeader from './ActionsheetHeader';
// import ActionsheetFooter from './ActionsheetFooter';

import ActionsheetContent from './ActionsheetContent';
const ActionsheetTemp = ActionsheetMain;
ActionsheetTemp.Content = ActionsheetContent;
ActionsheetTemp.Item = ActionsheetItem; // ActionsheetTemp.Header = ActionsheetHeader;
// ActionsheetTemp.Footer = ActionsheetFooter;
// To add typings

const Actionsheet = ActionsheetTemp;
export { Actionsheet };
//# sourceMappingURL=index.js.map