export declare const Alert: {
    baseStyle: {
        alignItems: string;
        justifyContent: string;
        p: number;
        space: number;
        borderRadius: string;
    };
    variants: {
        subtle: (props: Record<string, any>) => {
            bg: any;
            _icon: {
                color: any;
            };
        };
        solid: (props: Record<string, any>) => {
            borderWidth: number;
            borderColor: string;
            bg: any;
            _icon: {
                color: any;
            };
        };
        'left-accent': (props: Record<string, any>) => {
            borderWidth: number;
            bg: any;
            _icon: {
                color: any;
            };
            borderColor: string;
            borderLeftColor: any;
        };
        'top-accent': (props: Record<string, any>) => {
            borderWidth: number;
            borderColor: string;
            borderTopColor: any;
            bg: any;
            _icon: {
                color: any;
            };
        };
        outline: (props: Record<string, any>) => {
            borderWidth: number;
            borderColor: any;
            _icon: {
                color: any;
            };
        };
        'outline-light': (props: Record<string, any>) => {
            borderWidth: number;
            borderColor: string;
            _icon: {
                color: any;
            };
        };
    };
    defaultProps: {
        colorScheme: string;
        variant: string;
    };
};
export declare const AlertIcon: {
    baseStyle: {
        size: number;
    };
};
