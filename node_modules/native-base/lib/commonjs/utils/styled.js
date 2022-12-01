"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStyledComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../hooks/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const makeStyledComponent = Comp => {
  return /*#__PURE__*/_react.default.forwardRef(({
    debug,
    ...props
  }, ref) => {
    const [style, restProps] = (0, _hooks.useStyledSystemPropsResolver)(props);

    if (process.env.NODE_ENV === 'development' && debug) {
      /* eslint-disable-next-line */
      console.log("%cstyleSystem", 'background: #4b5563; color: #d97706; font-weight: 700; padding: 2px 8px;');
      /* eslint-disable-next-line */

      console.log('%c props: ', 'color: #4ade80; font-weight: 700;', props);
      /* eslint-disable-next-line */

      console.log('%c style: ', 'color: #22d3ee; font-weight: 700;', style);
      /* eslint-disable-next-line */

      console.log('%c restProps: ', 'color: #22d3ee; font-weight: 700;', restProps);
    }

    return /*#__PURE__*/_react.default.createElement(Comp, _extends({}, restProps, {
      style: style,
      ref: ref
    }), props.children);
  });
};

exports.makeStyledComponent = makeStyledComponent;
//# sourceMappingURL=styled.js.map