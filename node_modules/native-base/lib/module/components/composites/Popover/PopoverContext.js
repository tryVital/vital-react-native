import React from 'react';
export const PopoverContext = /*#__PURE__*/React.createContext({
  onClose: () => {},
  initialFocusRef: {
    current: null
  },
  finalFocusRef: {
    current: null
  },
  popoverContentId: undefined,
  headerId: undefined,
  bodyId: undefined,
  setHeaderMounted: () => {},
  setBodyMounted: () => {},
  headerMounted: false,
  bodyMounted: false,
  isOpen: false
});
//# sourceMappingURL=PopoverContext.js.map