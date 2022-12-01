"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeString = capitalizeString;
exports.getDefaultValue = getDefaultValue;
exports.dropdownDefaultStateValues = void 0;
const dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ''
};
exports.dropdownDefaultStateValues = dropdownDefaultStateValues;

function capitalizeString(string) {
  return "".concat(string.slice(0, 1).toUpperCase()).concat(string.slice(1));
}

function getDefaultValue(props, propKey, defaultStateValues = dropdownDefaultStateValues) {
  const defaultPropKey = "default".concat(capitalizeString(propKey));

  if (defaultPropKey in props) {
    return props[defaultPropKey];
  } //@ts-ignore


  return defaultStateValues[propKey];
}
//# sourceMappingURL=utils.js.map