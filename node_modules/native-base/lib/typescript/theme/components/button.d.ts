import type { InterfaceButtonProps } from '../../components/primitives/Button/types';
export declare const ButtonGroup: {
    baseStyle: {
        direction: string;
    };
    defaultProps: {
        space: number;
    };
};
declare const _default: {
    baseStyle: (props: InterfaceButtonProps & {
        theme: any;
    }) => {
        borderRadius: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        _web: {
            _disabled: {
                cursor: string;
            };
            _loading: {
                cursor: string;
            };
            cursor: string;
            userSelect: string;
        };
        _focusVisible: {
            _web: {
                outlineWidth: string;
                style: {
                    boxShadow: string;
                };
            };
        };
        _dark: {
            _focusVisible: {
                _web: {
                    outlineWidth: string;
                    style: {
                        boxShadow: string;
                    };
                };
            };
        };
        _stack: {
            space: string;
            alignItems: string;
        };
        _loading: {
            opacity: string;
        };
        _disabled: {
            opacity: string;
        };
        _spinner: {
            size: string;
            focusable: boolean;
        };
    };
    variants: {
        ghost: any;
        outline: any;
        solid: any;
        subtle: any;
        link: any;
        unstyled: any;
    };
    sizes: {
        lg: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        md: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        sm: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
        xs: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
            _icon: {
                size: string;
            };
        };
    };
    defaultProps: {
        variant: string;
        size: string;
        colorScheme: string;
    };
};
export default _default;
