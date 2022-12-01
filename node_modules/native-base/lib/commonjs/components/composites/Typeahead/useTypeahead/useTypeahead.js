"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTypeahead = useTypeahead;

var _reducer = require("./reducer");

var _react = _interopRequireWildcard(require("react"));

var stateChangeTypes = _interopRequireWildcard(require("./types"));

var _reactNative = require("react-native");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function isControlledProp(props, key) {
  return props[key] !== undefined;
}

function useTypeahead(props) {
  let defaultValues = { ..._utils.dropdownDefaultStateValues
  };
  defaultValues.isOpen = (0, _utils.getDefaultValue)(props, 'isOpen');

  const [state, dispatch] = _react.default.useReducer(_reducer.useTypeaheadReducer, defaultValues);

  const dispatchWithProps = object => {
    dispatch({ ...object,
      props
    });
  };

  const {
    inputValue,
    isOpen
  } = state;
  const {
    items,
    onInputValueChange,
    onSelectedItemChange,
    selectedItem,
    itemToString
  } = props;
  const isControlled = isControlledProp(props, 'selectedItem');
  (0, _react.useEffect)(() => {
    if (isControlled) {
      dispatch({
        type: stateChangeTypes.ControlledPropUpdatedSelectedItem,
        inputValue: itemToString(selectedItem)
      });
    }
  }, [selectedItem, isControlled, itemToString]);

  const onChangeText = text => {
    onInputValueChange === null || onInputValueChange === void 0 ? void 0 : onInputValueChange({
      inputValue: text
    });
    dispatchWithProps({
      type: stateChangeTypes.InputChange,
      inputValue: text
    });
  };

  const handleItemSelect = (item, index) => {
    onSelectedItemChange === null || onSelectedItemChange === void 0 ? void 0 : onSelectedItemChange(item);
    dispatchWithProps({
      type: stateChangeTypes.ItemClick,
      index
    });

    _reactNative.Keyboard.dismiss();
  };

  const getMenuItemProps = (item, index) => {
    return {
      onPress: () => handleItemSelect(item, index),
      accessible: true,
      accessiblityRole: 'menuitem'
    };
  };

  const getMenuProps = () => {
    return {
      accessible: true,
      accessibilityRole: 'menu',
      accessibilityHint: "Showing ".concat(items.length, " records")
    };
  };

  const getToggleButtonProps = () => {
    return {
      onPress: () => {
        dispatchWithProps({
          type: stateChangeTypes.ToggleButtonClick
        });
      }
    };
  };

  const getInputProps = (propInputVal, propOnchangeText) => {
    return {
      onChangeText: propInputVal ? propOnchangeText : onChangeText,
      value: propInputVal ? propInputVal : inputValue,
      accessibilityRole: 'combobox',
      accessibilityLabel: 'Typeahead input',
      accessibilityState: {
        expanded: isOpen
      }
    };
  };

  return {
    getInputProps,
    getMenuItemProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen
  };
}
//# sourceMappingURL=useTypeahead.js.map