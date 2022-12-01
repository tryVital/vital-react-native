"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonText = exports.Skeleton = void 0;
// Skeleton
const Skeleton = {
  baseStyle: () => {
    return {
      startColor: 'muted.200',
      _dark: {
        startColor: 'muted.600'
      },
      endColor: 'transparent',
      overflow: 'hidden',
      fadeDuration: 0.1,
      speed: 1.0,
      h: '10',
      w: '100%'
    };
  }
}; // SkeletonText

exports.Skeleton = Skeleton;
const SkeletonText = {
  baseStyle: () => {
    return {
      startColor: 'muted.200',
      _dark: {
        startColor: 'muted.600'
      },
      endColor: 'transparent',
      fadeDuration: 0.1,
      w: '100%',
      speed: 1.0,
      flexDirection: 'column',
      _line: {
        h: 3,
        rounded: 'full'
      }
    };
  },
  defaultProps: {
    lines: 3,
    space: 3
  }
};
exports.SkeletonText = SkeletonText;
//# sourceMappingURL=skeleton.js.map