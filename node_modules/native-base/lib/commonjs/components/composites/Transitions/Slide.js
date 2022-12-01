"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Slide = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../../primitives/Box"));

var _PresenceTransition = _interopRequireDefault(require("./PresenceTransition"));

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

var _Overlay = require("../../primitives/Overlay");

var _hooks = require("../../../hooks/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const holderStyle = {
  top: {
    top: 0,
    right: 0,
    left: 0
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0
  },
  bottom: {
    bottom: 0,
    right: 0,
    left: 0
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0
  }
};
const Slide = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(({
  children,
  ...props
}, ref) => {
  const {
    in: visible,
    placement,
    overlay,
    duration,
    _overlay,
    ...resolvedProps
  } = (0, _hooks.usePropsResolution)('Slide', props);

  const [containerOpacity, setContainerOpacity] = _react.default.useState(0);

  const [size, setSize] = _react.default.useState(0);

  const provideSize = layoutSize => {
    if (placement === 'right' || placement === 'left') setSize(layoutSize.width);else setSize(layoutSize.height);
    setContainerOpacity(1);
  };

  const transition = {
    duration
  };
  const animationStyle = {
    top: {
      initial: {
        translateY: -size
      },
      animate: {
        translateY: 0,
        transition
      }
    },
    bottom: {
      initial: {
        translateY: size
      },
      animate: {
        translateY: 0,
        transition
      },
      exit: {
        translateY: size,
        transition
      }
    },
    left: {
      initial: {
        translateX: -size
      },
      animate: {
        translateX: 0,
        transition
      }
    },
    right: {
      initial: {
        translateX: size
      },
      animate: {
        translateX: 0,
        transition
      }
    }
  }; //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  const slideComponent = /*#__PURE__*/_react.default.createElement(_PresenceTransition.default, _extends({
    visible: visible
  }, animationStyle[placement], {
    style: [{
      position: 'absolute'
    }, holderStyle[placement], {
      height: '100%'
    }]
  }), /*#__PURE__*/_react.default.createElement(_Box.default, _extends({}, resolvedProps, {
    opacity: containerOpacity,
    ref: ref,
    onLayout: e => provideSize(e.nativeEvent.layout)
  }), children));

  if (overlay) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Overlay.Overlay, _extends({
      isKeyboardDismissable: false
    }, _overlay), slideComponent));
  } else {
    return slideComponent;
  }
}));
exports.Slide = Slide;
var _default = Slide;
exports.default = _default;
//# sourceMappingURL=Slide.js.map