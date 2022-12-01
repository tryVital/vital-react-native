declare const _default: {
    baseStyle: (props: Record<string, any>) => {
        justifyContent: string;
        flexDirection: string;
        borderWidth: number;
        borderRadius: string;
        opacity: number;
        p: number;
        bg: string;
        borderColor: string;
        _text: {
            color: string;
            ml: number;
        };
        _icon: {
            color: string;
        };
        _checked: {
            borderColor: string;
            bg: string;
            _hover: {
                borderColor: string;
                bg: string;
                _disabled: {
                    borderColor: string;
                    bg: string;
                };
            };
            _pressed: {
                borderColor: string;
                bg: string;
            };
        };
        _hover: {
            borderColor: string;
            _disabled: {
                borderColor: string;
            };
        };
        _pressed: {
            borderColor: string;
        };
        _invalid: {
            borderColor: string;
        };
        _dark: {
            bg: string;
            borderColor: string;
            _text: {
                color: string;
            };
            _icon: {
                color: string;
            };
            _checked: {
                borderColor: string;
                bg: string;
                _hover: {
                    borderColor: string;
                    bg: string;
                    _disabled: {
                        borderColor: string;
                        bg: string;
                    };
                };
                _pressed: {
                    borderColor: string;
                    bg: string;
                };
            };
            _hover: {
                borderColor: string;
                _disabled: {
                    borderColor: string;
                };
            };
            _pressed: {
                borderColor: string;
            };
            _invalid: {
                borderColor: string;
            };
        };
        _stack: {
            direction: string;
            alignItems: string;
            space: number;
            _web: {
                cursor: string;
            };
        };
        _focusVisible: {
            _web: {
                style: {
                    outlineWidth: string;
                    outlineColor: any;
                    outlineStyle: string;
                };
            };
        };
        _disabled: {
            _web: {
                cursor: string;
            };
            opacity: number;
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
