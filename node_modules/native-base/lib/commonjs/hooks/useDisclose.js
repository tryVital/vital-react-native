"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDisclose = useDisclose;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDisclose(initState) {
  const [isOpen, setIsOpen] = _react.default.useState(initState || false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
}
//# sourceMappingURL=useDisclose.js.map