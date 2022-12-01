declare const _default: {
    baseStyle: {
        _text: {
            fontFamily: string;
            fontSize: string;
        };
        borderRadius: string;
        px: number;
        py: number;
    };
    variants: {
        solid: (props: Record<string, any>) => {
            bg: any;
            _text: {
                color: any;
            };
            borderWidth: string;
            borderColor: string;
            borderRadius: string;
        };
        subtle: (props: Record<string, any>) => {
            bg: any;
            _text: {
                color: any;
            };
            borderWidth: string;
            borderRadius: string;
            borderColor: string;
        };
        outline: (props: Record<string, any>) => {
            borderColor: any;
            _text: {
                color: any;
            };
            borderRadius: string;
            borderWidth: string;
        };
    };
    defaultProps: {
        variant: string;
        colorScheme: string;
    };
};
export default _default;
