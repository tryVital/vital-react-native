"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Stack = require("../../primitives/Stack");

var _Context = require("./Context");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BreadcrumbItem = (props, ref) => {
  const {
    children,
    isCurrent,
    _text,
    ...remainingProps
  } = props; //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return (
    /*#__PURE__*/
    // Provider wrapped to use isCurrent prop in children of breadcrumb Item
    _react.default.createElement(_Context.BreadcrumbItemContext.Provider, {
      value: {
        isCurrent
      }
    }, /*#__PURE__*/_react.default.createElement(_Stack.HStack, _extends({}, remainingProps, {
      ref: ref
    }), _react.default.Children.map(children, (child, index) => /*#__PURE__*/_react.default.cloneElement(child, {
      'key': "breadcrumb-item-".concat(index),
      '_text': { ..._text,
        //taken out empty _text prop from props
        fontWeight: 700
      },
      ...{
        isUnderlined: false
      },
      ...remainingProps,
      'aria-current': _reactNative.Platform.OS === 'web' && isCurrent ? 'page' : undefined
    }))))
  );
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(BreadcrumbItem));

exports.default = _default;
//# sourceMappingURL=BreadcrumbItem.js.map