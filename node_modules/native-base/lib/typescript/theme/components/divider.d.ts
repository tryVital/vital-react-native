declare function baseStyle(props: Record<string, any>): {
    width: string;
    height: string;
    bg: string;
    _dark: {
        bg: string;
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    defaultProps: {
        orientation: string;
        thickness: string;
    };
};
export default _default;
