declare const _default: {
    variants: {
        solid: any;
        subtle: any;
        outline: any;
    };
    baseStyle: {
        _text: {
            fontWeight: string;
        };
        alignItems: string;
        justifyContent: string;
        flexDirection: string;
        display: string;
    };
    sizes: {
        sm: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            p: number;
            borderRadius: string;
        };
        md: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            borderRadius: string;
            p: number;
        };
        lg: {
            minH: number;
            minW: number;
            _text: {
                fontSize: string;
            };
            borderRadius: string;
            p: number;
        };
    };
    defaultProps: {
        size: string;
        variant: string;
        colorScheme: string;
    };
};
export default _default;
