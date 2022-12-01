"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _Pressable = require("../../primitives/Pressable");

var _MenuContext = require("./MenuContext");

var _useMenu = require("./useMenu");

var _utils = require("../../../utils");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _primitives = require("../../primitives");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MenuItem = ({
  children,
  isDisabled,
  onPress,
  textValue,
  ...props
}, ref) => {
  const {
    closeOnSelect,
    onClose
  } = _react.default.useContext(_MenuContext.MenuContext);

  const menuItemRef = _react.default.useRef(null);

  const mergedRef = (0, _utils.mergeRefs)([menuItemRef, ref]);
  const {
    _text,
    _stack,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('MenuItem', props, {
    isDisabled
  }, {
    cascadePseudoProps: true
  });

  const [textContent, setTextContent] = _react.default.useState('');

  _react.default.useEffect(() => {
    const menuItem = menuItemRef.current;

    if (menuItem) {
      var _menuItem$textContent;

      setTextContent(((_menuItem$textContent = menuItem.textContent) !== null && _menuItem$textContent !== void 0 ? _menuItem$textContent : '').trim());
    }
  }, [children]);

  const menuItemProps = (0, _useMenu.useMenuItem)({
    textValue: textValue !== null && textValue !== void 0 ? textValue : textContent,
    ref: menuItemRef
  }); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({}, menuItemProps, resolvedProps, {
    ref: mergedRef,
    disabled: isDisabled,
    accessibilityState: {
      disabled: isDisabled
    },
    onPress: e => {
      if (!isDisabled) {
        onPress && onPress(e);

        if (closeOnSelect) {
          onClose && onClose();
        }
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_primitives.HStack, _stack, _react.default.Children.map(children, (child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
        key: "menu-item-".concat(index)
      }, _text), child);
    } else {
      return child;
    }
  })));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(MenuItem));

exports.default = _default;
//# sourceMappingURL=MenuItem.js.map