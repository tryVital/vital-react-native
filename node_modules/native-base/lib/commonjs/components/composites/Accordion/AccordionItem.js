"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _Context = require("./Context");

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AccordionItem = ({
  children,
  index: pIndex = 0,
  isDisabled,
  ...props
}, ref) => {
  const {
    index: cIndex,
    changeHandler
  } = _react.default.useContext(_Context.AccordionContext);

  const { ...newProps
  } = (0, _hooks.useThemeProps)('AccordionItem', props);
  const isOpen = cIndex === null || cIndex === void 0 ? void 0 : cIndex.includes(pIndex);

  const onClose = cb => {
    changeHandler && changeHandler(false, pIndex);
    cb && cb();
  };

  const onOpen = cb => {
    changeHandler && changeHandler(true, pIndex);
    cb && cb();
  };

  const childSetter = () => {
    if (typeof children === 'function') return children({
      isExpanded: isOpen,
      isDisabled
    });
    return children;
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Context.AccordionItemContext.Provider, {
    value: {
      index: pIndex,
      isOpen,
      isDisabled,
      onClose,
      onOpen
    }
  }, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, newProps, {
    ref: ref
  }), childSetter()));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(AccordionItem));

exports.default = _default;
//# sourceMappingURL=AccordionItem.js.map