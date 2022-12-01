"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MenuOptionContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuGroup = _interopRequireDefault(require("./MenuGroup"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MenuOptionContext = /*#__PURE__*/_react.default.createContext({
  values: [],
  onChange: _val => {},
  type: 'checkbox'
});

exports.MenuOptionContext = MenuOptionContext;

const MenuOptionGroup = ({
  type,
  defaultValue,
  value,
  onChange,
  ...props
}, ref) => {
  const internalDefaultValue = defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];

  const [internalValues, setValues] = _react.default.useState(internalDefaultValue);

  const _onChange = newValue => {
    if (type === 'checkbox') {
      const newValues = [...internalValues];

      if (internalValues.includes(newValue)) {
        newValues.splice(newValues.indexOf(newValue), 1);
        setValues(newValues);
      } else {
        newValues.push(newValue);
        setValues(newValues);
      }

      onChange && onChange(newValues);
    } else if (type === 'radio') {
      setValues([newValue]);
      onChange && onChange(newValue);
    }
  }; //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(MenuOptionContext.Provider, {
    value: {
      values: !value ? internalValues : Array.isArray(value) ? value : [value],
      onChange: _onChange,
      type
    }
  }, /*#__PURE__*/_react.default.createElement(_MenuGroup.default, _extends({}, props, {
    ref: ref
  })));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(MenuOptionGroup));

exports.default = _default;
//# sourceMappingURL=MenuOptionGroup.js.map