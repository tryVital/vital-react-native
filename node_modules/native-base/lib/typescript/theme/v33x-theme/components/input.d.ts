declare function roundedStyle(props: Record<string, any>): {
    borderRadius: string;
    borderWidth: string;
    _hover: {
        bg: any;
    };
};
declare function outlineStyle(props: Record<string, any>): {
    borderWidth: string;
    _hover: {
        bg: any;
    };
};
declare function filledStyle(props: Record<string, any>): {
    bg: any;
    borderWidth: string;
    borderColor: string;
    _hover: {
        bg: any;
    };
};
declare function unstyledStyle(): {
    borderWidth: string;
};
declare function underlinedStyle(): {
    borderRadius: string;
    borderTopWidth: string;
    borderLeftWidth: string;
    borderRightWidth: string;
    borderBottomWidth: string;
};
export declare const Input: {
    baseStyle: (props: Record<string, any>) => {
        selectionColor: any;
        fontFamily: string;
        p: string;
        borderRadius: string;
        overflow: string;
        color: any;
        placeholderTextColor: string;
        borderColor: any;
        _disabled: {
            opacity: string;
            bg: any;
            _web: {
                disabled: boolean;
                cursor: string;
            };
        };
        _invalid: {
            borderColor: any;
        };
        _focus: {
            borderColor: any;
        };
        _web: {
            outlineWidth: string;
            overflow: string;
            lineHeight: string;
            outline: string;
            cursor: string;
        };
        _stack: {
            flexDirection: string;
            alignItems: string;
            overflow: string;
        };
        _input: {
            bg: string;
            flex: number;
        };
    };
    defaultProps: {
        size: string;
        variant: string;
    };
    variants: {
        outline: typeof outlineStyle;
        underlined: typeof underlinedStyle;
        rounded: typeof roundedStyle;
        filled: typeof filledStyle;
        unstyled: typeof unstyledStyle;
    };
    sizes: {
        '2xl': {
            fontSize: string;
        };
        xl: {
            fontSize: string;
        };
        lg: {
            fontSize: string;
        };
        md: {
            fontSize: string;
        };
        sm: {
            fontSize: string;
        };
        xs: {
            fontSize: string;
        };
    };
};
declare const _default: {};
export default _default;
