import AlertDialog from './AlertDialog';
import AlertDialogContent from './AlertDialogContent';
import AlertDialogBody from './AlertDialogBody';
import AlertDialogCloseButton from './AlertDialogCloseButton';
import AlertDialogFooter from './AlertDialogFooter';
import AlertDialogHeader from './AlertDialogHeader';
const AlertDialogTemp = AlertDialog;
AlertDialogTemp.Content = AlertDialogContent;
AlertDialogTemp.CloseButton = AlertDialogCloseButton;
AlertDialogTemp.Header = AlertDialogHeader;
AlertDialogTemp.Footer = AlertDialogFooter;
AlertDialogTemp.Body = AlertDialogBody;
const AlertDialogMain = AlertDialogTemp;
export { AlertDialogMain as AlertDialog };
//# sourceMappingURL=index.js.map