"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const placementProps = {
  'top-right': {
    top: 4,
    right: 4,
    position: 'absolute'
  },
  'top-left': {
    top: 4,
    left: 4,
    position: 'absolute'
  },
  'bottom-right': {
    bottom: 4,
    right: 4,
    position: 'absolute'
  },
  'bottom-left': {
    bottom: 4,
    left: 4,
    position: 'absolute'
  }
};
const baseStyle = {
  shadow: 7,
  rounded: 'full',
  zIndex: 20,
  placementProps,
  px: 4,
  py: 4
};
const defaultProps = {
  renderInPortal: true,
  variant: 'solid',
  colorScheme: 'primary',
  placement: 'bottom-right'
};
var _default = {
  baseStyle,
  defaultProps
};
exports.default = _default;
//# sourceMappingURL=fab.js.map