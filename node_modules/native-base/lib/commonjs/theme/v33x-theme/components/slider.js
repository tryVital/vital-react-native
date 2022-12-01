"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = exports.SliderFilledTrack = exports.SliderThumb = exports.SliderTrack = void 0;

var _tools = require("../tools");

const SliderTrack = {
  baseStyle: ({
    isVertical,
    size,
    ...props
  }) => {
    const simplifiedColorScheme = (0, _tools.getColorScheme)(props);
    return {
      bg: "".concat(simplifiedColorScheme, ".100"),
      borderRadius: 'lg',
      overflow: 'hidden',
      style: {
        height: isVertical ? '100%' : size,
        width: !isVertical ? '100%' : size
      },
      _pressable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: isVertical ? '100%' : size,
        width: !isVertical ? '100%' : size,
        py: !isVertical ? '3' : undefined,
        px: isVertical ? '3' : undefined
      }
    };
  }
};
exports.SliderTrack = SliderTrack;
const SliderThumb = {
  baseStyle: props => {
    const simplifiedColorScheme = (0, _tools.getColorScheme)(props);
    return {
      borderRadius: 99999,
      zIndex: 999,
      alignItems: 'center',
      justifyContent: 'center',
      bg: (0, _tools.mode)("".concat(simplifiedColorScheme, ".600"), "".concat(simplifiedColorScheme, ".300"))(props),
      scaleOnPressed: 1.2
    };
  }
};
exports.SliderThumb = SliderThumb;
const SliderFilledTrack = {
  baseStyle: ({
    orientation,
    isReversed,
    sliderTrackPosition,
    size,
    ...props
  }) => {
    const simplifiedColorScheme = (0, _tools.getColorScheme)(props);
    return {
      bg: (0, _tools.mode)("".concat(simplifiedColorScheme, ".600"), "".concat(simplifiedColorScheme, ".300"))(props),
      left: orientation !== 'vertical' && !isReversed ? 0 : undefined,
      bottom: orientation === 'vertical' && !isReversed ? 0 : undefined,
      right: orientation !== 'vertical' && isReversed ? 0 : undefined,
      top: orientation === 'vertical' && isReversed ? 0 : undefined,
      style: orientation === 'vertical' ? {
        height: sliderTrackPosition,
        width: size
      } : {
        width: sliderTrackPosition,
        height: size
      }
    };
  }
};
exports.SliderFilledTrack = SliderFilledTrack;
const sizes = {
  lg: {
    thumbSize: 6,
    sliderSize: 6
  },
  md: {
    thumbSize: 5,
    sliderSize: 5
  },
  sm: {
    thumbSize: 4,
    sliderSize: 4
  }
};
const Slider = {
  baseStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      height: props.orientation === 'vertical' ? '100%' : undefined,
      width: props.orientation !== 'vertical' ? '100%' : undefined
    };
  },
  defaultProps: {
    size: 'sm'
  },
  sizes
};
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map