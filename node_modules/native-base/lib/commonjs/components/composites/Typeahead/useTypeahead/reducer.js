"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTypeaheadReducer = useTypeaheadReducer;

var stateChangeTypes = _interopRequireWildcard(require("./types"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useTypeaheadReducer(state, action) {
  const {
    type,
    props
  } = action;
  let changes;

  switch (type) {
    case stateChangeTypes.ItemClick:
      changes = {
        isOpen: (0, _utils.getDefaultValue)(props, 'isOpen'),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;

    case stateChangeTypes.InputBlur:
      if (state.isOpen) {
        changes = {
          isOpen: false
        };
      }

      break;

    case stateChangeTypes.InputChange:
      changes = {
        isOpen: true,
        inputValue: action.inputValue
      };
      break;

    case stateChangeTypes.ToggleButtonClick:
    case stateChangeTypes.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen
      };
      break;

    case stateChangeTypes.FunctionOpenMenu:
      changes = {
        isOpen: true
      };
      break;

    case stateChangeTypes.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;

    case stateChangeTypes.FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;

    case stateChangeTypes.ControlledPropUpdatedSelectedItem:
    case stateChangeTypes.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;

    case stateChangeTypes.FunctionReset:
      changes = {
        isOpen: (0, _utils.getDefaultValue)(props, 'isOpen'),
        selectedItem: (0, _utils.getDefaultValue)(props, 'selectedItem'),
        inputValue: (0, _utils.getDefaultValue)(props, 'inputValue')
      };
      break;

    default:
      throw new Error('Reducer called without proper action type.');
  }

  return { ...state,
    ...changes
  };
}
//# sourceMappingURL=reducer.js.map