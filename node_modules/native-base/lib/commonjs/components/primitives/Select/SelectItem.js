"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Item = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Actionsheet = require("../../composites/Actionsheet");

var _Select = require("./Select");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Item = ({
  isDisabled,
  label,
  value,
  ...props
}, ref) => {
  const {
    onValueChange,
    selectedValue,
    _selectedItem,
    _item
  } = _react.default.useContext(_Select.SelectContext); //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)({ ...props,
    isDisabled,
    label,
    value
  })) {
    return null;
  }

  if (_reactNative.Platform.OS !== 'web') {
    const isSelected = selectedValue === value;
    return /*#__PURE__*/_react.default.createElement(_Actionsheet.Actionsheet.Item, _extends({
      ref: ref,
      onPress: () => {
        if (!isDisabled) {
          onValueChange(value);
        }
      },
      accessibilityState: {
        selected: isSelected
      }
    }, _item, isSelected && _selectedItem, props), label);
  } else {
    return /*#__PURE__*/_react.default.createElement("option", {
      ref: ref,
      value: value,
      disabled: isDisabled
    }, label);
  }
};

exports.Item = Item;

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Item));

exports.default = _default;
//# sourceMappingURL=SelectItem.js.map