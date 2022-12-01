/* eslint-disable */
//@ts-nocheck
// This functions is taken from react native web
import unitlessNumbers from './unitlessNumbers';
import normalizeColor from './normalizeColor';
const colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true
};
export default function normalizeValueWithProperty(value, property) {
  let returnValue = value;

  if ((property == null || !unitlessNumbers[property]) && typeof value === 'number') {
    returnValue = "".concat(value, "px");
  } else if (property != null && colorProps[property]) {
    returnValue = normalizeColor(value);
  }

  return returnValue;
}
//# sourceMappingURL=normalizeValueWithProperty.js.map