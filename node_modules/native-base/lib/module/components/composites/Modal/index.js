import Modal from './Modal';
import ModalContent from './ModalContent';
import ModalBody from './ModalBody';
import ModalCloseButton from './ModalCloseButton';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
const ModalTemp = Modal;
ModalTemp.Content = ModalContent;
ModalTemp.CloseButton = ModalCloseButton;
ModalTemp.Header = ModalHeader;
ModalTemp.Footer = ModalFooter;
ModalTemp.Body = ModalBody;
const ModalMain = ModalTemp;
export { ModalMain as Modal };
//# sourceMappingURL=index.js.map