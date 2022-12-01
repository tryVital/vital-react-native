declare const _default: {
    baseStyle: (props: Record<string, any>) => {
        _disabled: {
            opacity: number;
        };
        _invalid: {
            borderWidth: number;
            borderRadius: number;
            borderColor: string;
        };
        offTrackColor: any;
        onTrackColor: any;
        onThumbColor: any;
        offThumbColor: any;
    };
    sizes: {
        sm: {
            style: {
                transform: {
                    scale: number;
                }[];
            };
        };
        md: {};
        lg: {
            style: {
                transform: {
                    scale: number;
                }[];
            };
            margin: number;
        };
    };
    defaultProps: {
        size: string;
        colorScheme: string;
    };
};
export default _default;
