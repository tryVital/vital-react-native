declare function baseStyle({ isVertical, ...props }: Record<string, any>): {
    flexDirection: string;
    space: number;
    _avatar: {
        borderColor: any;
        borderWidth: number;
    };
    _hiddenAvatarPlaceholder: {
        bg: any;
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    defaultProps: {
        isVertical: boolean;
    };
};
export default _default;
