"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Stack = require("../Stack");

var _useThemeProps = require("../../../hooks/useThemeProps");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const List = ({
  children,
  divider,
  ...props
}, ref) => {
  const {
    _text,
    _hover,
    _focus,
    _pressed,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('List', props); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  } // add props to children


  children = _react.default.Children.map(children, (child, ind) => {
    var _child$props, _child$props2, _child$props3, _child$props4;

    return /*#__PURE__*/_react.default.cloneElement(child, {
      index: ind,
      _text: { ..._text,
        ...((_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props._text)
      },
      _hover: { ..._hover,
        ...((_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2._hover)
      },
      _focus: { ..._focus,
        ...((_child$props3 = child.props) === null || _child$props3 === void 0 ? void 0 : _child$props3._focus)
      },
      _pressed: { ..._pressed,
        ...((_child$props4 = child.props) === null || _child$props4 === void 0 ? void 0 : _child$props4._pressed)
      }
    });
  });
  return /*#__PURE__*/_react.default.createElement(_Stack.VStack, _extends({
    divider: divider,
    ref: ref
  }, resolvedProps), children);
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(List));

exports.default = _default;
//# sourceMappingURL=List.js.map