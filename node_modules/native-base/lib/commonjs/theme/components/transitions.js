"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideFade = exports.Slide = exports.ScaleFade = exports.Fade = exports.fadeBaseStyle = void 0;
//Fade
// const fadeDefaultProps = {
//   entryDuration: 500,
//   exitDuration: 500,
// };
const fadeBaseStyle = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 500
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 500
    }
  }
};
exports.fadeBaseStyle = fadeBaseStyle;
const Fade = {
  baseStyle: fadeBaseStyle
}; //ScaleFade
//Can be commented if not used anywhere else
// const scaleFadeDefaultProps = {
//   duration: 500,
//   initialScale: 0.9,
// };

exports.Fade = Fade;
const scaleBaseStyle = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: 500
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: 500
  }
};
const ScaleFade = {
  baseStyle: scaleBaseStyle
}; //Slide

exports.ScaleFade = ScaleFade;
const slideDefaultProps = {
  duration: 500,
  placement: 'bottom',
  overlay: true,
  _overlay: {
    isOpen: true
  }
};
const Slide = {
  baseStyle: {
    h: '100%',
    pointerEvents: 'box-none',
    _overlay: {
      style: {
        overflow: 'hidden'
      }
    }
  },
  defaultProps: slideDefaultProps
}; //SlideFade

exports.Slide = Slide;
const slideFadeDefaultProps = {
  duration: 500,
  offsetX: 10,
  offsetY: 10
};
const SlideFade = {
  defaultProps: slideFadeDefaultProps
};
exports.SlideFade = SlideFade;
//# sourceMappingURL=transitions.js.map