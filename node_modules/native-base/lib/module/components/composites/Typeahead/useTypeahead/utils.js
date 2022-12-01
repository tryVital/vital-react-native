export const dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ''
};
export function capitalizeString(string) {
  return "".concat(string.slice(0, 1).toUpperCase()).concat(string.slice(1));
}
export function getDefaultValue(props, propKey, defaultStateValues = dropdownDefaultStateValues) {
  const defaultPropKey = "default".concat(capitalizeString(propKey));

  if (defaultPropKey in props) {
    return props[defaultPropKey];
  } //@ts-ignore


  return defaultStateValues[propKey];
}
//# sourceMappingURL=utils.js.map