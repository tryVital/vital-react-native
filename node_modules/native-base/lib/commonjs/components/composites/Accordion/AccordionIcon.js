"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icons = require("../../primitives/Icon/Icons");

var _Context = require("./Context");

var _hooks = require("../../../hooks");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AccordionIcon = ({ ...props
}, ref) => {
  const {
    isOpen
  } = _react.default.useContext(_Context.AccordionItemContext);

  const { ...newProps
  } = (0, _hooks.useThemeProps)('AccordionIcon', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return isOpen ? /*#__PURE__*/_react.default.createElement(_Icons.ChevronUpIcon, _extends({
    color: "white"
  }, newProps, {
    ref: ref
  })) : /*#__PURE__*/_react.default.createElement(_Icons.ChevronDownIcon, _extends({}, newProps, {
    ref: ref
  }));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(AccordionIcon));

exports.default = _default;
//# sourceMappingURL=AccordionIcon.js.map