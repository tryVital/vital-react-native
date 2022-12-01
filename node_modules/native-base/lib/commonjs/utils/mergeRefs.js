"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeRefs = mergeRefs;
exports.composeEventHandlers = composeEventHandlers;

function mergeRefs(refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

function composeEventHandlers(originalEventHandler, ourEventHandler) {
  return function handleEvent(event) {
    originalEventHandler === null || originalEventHandler === void 0 ? void 0 : originalEventHandler(event);
    ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
  };
}
//# sourceMappingURL=mergeRefs.js.map