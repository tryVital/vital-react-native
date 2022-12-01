declare function baseStyle(props: Record<string, any>): {
    overflow: string;
    _filledTrack: {
        bg: string;
        shadow: number;
        height: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        rounded: string;
        _text: {
            color: string;
            fontWeight: string;
        };
    };
    bg: string;
    _dark: {
        bg: string;
        _filledTrack: {
            bg: string;
        };
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    defaultProps: {
        colorScheme: string;
        size: string;
        rounded: string;
        min: number;
        max: number;
        value: number;
        isIndeterminate: boolean;
    };
    sizes: {
        xs: {
            height: number;
        };
        sm: {
            height: number;
        };
        md: {
            height: number;
        };
        lg: {
            height: number;
        };
        xl: {
            height: number;
        };
        '2xl': {
            height: number;
        };
    };
};
export default _default;
