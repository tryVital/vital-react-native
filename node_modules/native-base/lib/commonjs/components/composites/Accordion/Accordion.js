"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _hooks = require("../../../hooks");

var _getIndexedChildren = _interopRequireDefault(require("../../../utils/getIndexedChildren"));

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Accordion = ({
  children,
  index: pIndex,
  defaultIndex,
  allowMultiple,
  allowToggle,
  onChange,
  ...props
}, ref) => {
  const {
    endingHeight,
    startingHeight,
    duration,
    isOpen,
    onAnimationEnd,
    onAnimationStart,
    ...newProps
  } = (0, _hooks.useThemeProps)('Accordion', props);

  const [index, setIndex] = _react.default.useState(pIndex || defaultIndex || []); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  const changeHandler = (isOpening, activeIndex) => {
    let indexCopy = index.map(i => i);

    if (allowToggle) {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        setIndex(index.splice(index.indexOf(activeIndex), 1));
      }
    } else {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        indexCopy = indexCopy.filter(n => n !== activeIndex);
        setIndex(indexCopy);
      }
    }

    onChange && onChange(indexCopy);
  };

  return /*#__PURE__*/_react.default.createElement(_Context.AccordionContext.Provider, {
    value: {
      index: index,
      changeHandler,
      AnimationProps: {
        endingHeight,
        startingHeight,
        duration,
        isOpen,
        onAnimationEnd,
        onAnimationStart
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_Box.default, _extends({
    overflow: "hidden"
  }, newProps, {
    ref: ref
  }), (0, _getIndexedChildren.default)(children)));
};

var _default = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Accordion));

exports.default = _default;
//# sourceMappingURL=Accordion.js.map