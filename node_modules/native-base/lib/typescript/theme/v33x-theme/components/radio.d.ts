declare const _default: {
    baseStyle: (props: Record<string, any>) => {
        borderWidth: number;
        borderRadius: string;
        p: number;
        borderColor: any;
        bg: any;
        _stack: {
            direction: string;
            alignItems: string;
            space: number;
            _web: {
                cursor: string;
            };
        };
        _interactionBox: {
            borderRadius: string;
            size: number;
            position: string;
            zIndex: number;
            _web: {
                transition: string;
                pointerEvents: string;
            };
        };
        _icon: {
            color: any;
        };
        _hover: {
            _interactionBox: {
                bg: string;
                size: number;
            };
        };
        _focus: {
            _interactionBox: {
                bg: string;
                size: number;
            };
        };
        _focusVisible: {
            _interactionBox: {
                bg: string;
                size: number;
            };
        };
        _checked: {
            borderColor: any;
        };
        _disabled: {
            opacity: number;
            _interactionBox: {
                bg: string;
            };
            _icon: {
                bg: string;
            };
            _stack: {
                opacity: string;
            };
        };
        _invalid: {
            borderColor: any;
        };
        _pressed: {
            _interactionBox: {
                bg: string;
                size: number;
            };
        };
    };
    sizes: {
        lg: {
            _icon: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
        md: {
            _icon: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
        sm: {
            _icon: {
                size: number;
            };
            _text: {
                fontSize: string;
            };
        };
    };
    defaultProps: {
        defaultIsChecked: boolean;
        size: string;
        colorScheme: string;
    };
};
export default _default;
