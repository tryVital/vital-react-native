import { mode } from '../tools';

function baseStyle({
  isVertical,
  ...props
}) {
  return {
    flexDirection: isVertical ? 'column-reverse' : 'row-reverse',
    space: -4,
    _avatar: {
      borderColor: mode('gray.50', 'gray.800')(props),
      borderWidth: 2
    },
    _hiddenAvatarPlaceholder: {
      bg: mode('gray.600', 'gray.100')(props)
    }
  };
}

export default {
  baseStyle,
  defaultProps: {
    isVertical: false
  }
};
//# sourceMappingURL=avatar-group.js.map