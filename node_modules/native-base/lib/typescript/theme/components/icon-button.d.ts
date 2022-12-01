declare function variantGhost({ colorScheme }: Record<string, any>): {
    _icon: {
        color: string;
    };
    _hover: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
    _dark: {
        _icon: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantOutline({ colorScheme }: Record<string, any>): {
    borderWidth: string;
    borderColor: string;
    _icon: {
        color: string;
    };
    _hover: {
        bg: string;
        _icon: {
            color: string;
        };
    };
    _pressed: {
        bg: string;
        _icon: {
            color: string;
        };
    };
    _focus: {
        bg: string;
        _icon: {
            color: string;
        };
    };
    _dark: {
        borderColor: string;
        _icon: {
            color: string;
        };
        _hover: {
            bg: string;
            _icon: {
                color: string;
            };
        };
        _pressed: {
            bg: string;
            _icon: {
                color: string;
            };
        };
        _focus: {
            bg: string;
            _icon: {
                color: string;
            };
        };
    };
};
declare function variantSolid({ colorScheme }: Record<string, any>): {
    bg: string;
    _hover: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
    _icon: {
        color: string;
    };
    _dark: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
            _icon: {
                color: string;
            };
        };
        _icon: {
            color: string;
        };
    };
};
declare function variantSubtle({ colorScheme }: Record<string, any>): {
    _text: {
        color: string;
    };
    _icon: {
        color: string;
    };
    bg: string;
    _hover: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
    _dark: {
        bg: string;
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
    };
};
declare function variantLink({ colorScheme }: Record<string, any>): {
    _spinner: {
        color: string;
    };
    _icon: {
        color: string;
    };
    _hover: {
        _icon: {
            color: string;
        };
    };
    _pressed: {
        _icon: {
            color: string;
        };
    };
    _dark: {
        _icon: {
            color: string;
        };
        _hover: {
            _icon: {
                color: string;
            };
        };
        _pressed: {
            _icon: {
                color: string;
            };
        };
    };
};
declare function variantUnstyled(): {
    _icon: {
        color: string;
    };
    _dark: {
        _icon: {
            color: string;
        };
    };
};
declare const _default: {
    baseStyle: (props: any) => {
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
        _focus: {
            borderColor: string;
        };
        _focusVisible: {
            _web: {
                style: {
                    outlineWidth: string;
                    outlineColor: string;
                    outlineStyle: string;
                };
            };
        };
        _loading: {
            opacity: string;
        };
        _disabled: {
            opacity: string;
        };
        _dark: {
            _focusVisible: {
                _web: {
                    style: {
                        outlineWidth: string;
                        outlineColor: string;
                        outlineStyle: string;
                    };
                };
            };
        };
    };
    variants: {
        ghost: typeof variantGhost;
        outline: typeof variantOutline;
        solid: typeof variantSolid;
        subtle: typeof variantSubtle;
        link: typeof variantLink;
        unstyled: typeof variantUnstyled;
    };
    sizes: {
        lg: {
            p: string;
            _icon: {
                size: string;
            };
        };
        md: {
            p: string;
            _icon: {
                size: string;
            };
        };
        sm: {
            p: string;
            _icon: {
                size: string;
            };
        };
        xs: {
            p: string;
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
