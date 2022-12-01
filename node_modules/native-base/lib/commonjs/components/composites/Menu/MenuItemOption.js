"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Icons = require("../../primitives/Icon/Icons");

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuOptionGroup = require("./MenuOptionGroup");

var _useMenu = require("./useMenu");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MenuItemOption = ({
  value,
  ...props
}, ref) => {
  const {
    values,
    onChange,
    type
  } = (0, _react.useContext)(_MenuOptionGroup.MenuOptionContext);
  const isChecked = values.includes(value);
  const menuOptionProps = (0, _useMenu.useMenuOptionItem)({
    isChecked,
    type
  });
  const {
    children,
    onPress,
    _icon,
    _text,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('MenuItem', props, {
    isChecked
  });

  const modifiedOnPress = e => {
    onChange(value);
    onPress && onPress(e);
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, _extends({}, resolvedProps, menuOptionProps, {
    accessibilityRole: "button",
    onPress: modifiedOnPress,
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_Icons.CheckIcon, _icon), _react.default.Children.map(children, (child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
        key: "menu-item-option-".concat(index)
      }, _text), child);
    } else {
      return child;
    }
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(MenuItemOption));

exports.default = _default;
//# sourceMappingURL=MenuItemOption.js.map