import type { IAvatarGroupProps } from '../../components/composites/Avatar/types';
declare function baseStyle({ isVertical }: IAvatarGroupProps): {
    flexDirection: string;
    space: number;
    _avatar: {
        borderWidth: number;
    };
    _hiddenAvatarPlaceholder: {
        _text: {
            color: string;
        };
    };
    _light: {
        _avatar: {
            borderColor: string;
        };
        _hiddenAvatarPlaceholder: {
            bg: string;
        };
    };
    _dark: {
        _avatar: {
            borderColor: string;
        };
        _hiddenAvatarPlaceholder: {
            bg: string;
        };
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    defaultProps: {
        isVertical: boolean;
    };
};
export default _default;
