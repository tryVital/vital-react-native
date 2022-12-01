import { Dict } from '../tools';
declare function variantGhost(props: Dict): {
    _text: {
        color: any;
    };
    bg?: undefined;
    _web?: undefined;
    _hover?: undefined;
    _focusVisible?: undefined;
    _pressed?: undefined;
    _spinner?: undefined;
} | {
    _text: {
        color: any;
    };
    bg: string;
    _web: {
        outlineWidth: string;
    };
    _hover: {
        borderColor: any;
        bg: string;
    };
    _focusVisible: {
        borderColor: any;
        bg: string;
    };
    _pressed: {
        borderColor: any;
        bg: string;
    };
    _spinner: {
        size: string;
    };
};
declare function variantOutline(props: Dict): {
    _text: {
        color: any;
    };
    bg?: undefined;
    _web?: undefined;
    _hover?: undefined;
    _focusVisible?: undefined;
    _pressed?: undefined;
    _spinner?: undefined;
    borderWidth: string;
    borderColor: any;
} | {
    _text: {
        color: any;
    };
    bg: string;
    _web: {
        outlineWidth: string;
    };
    _hover: {
        borderColor: any;
        bg: string;
    };
    _focusVisible: {
        borderColor: any;
        bg: string;
    };
    _pressed: {
        borderColor: any;
        bg: string;
    };
    _spinner: {
        size: string;
    };
    borderWidth: string;
    borderColor: any;
};
declare function variantSolid(props: Dict): {
    _web: {
        outlineWidth: string;
    };
    bg: string;
    _hover: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
    _focus: {
        bg: string;
    };
    _loading: {
        bg: any;
        opacity: string;
    };
    _disabled: {
        bg: any;
    };
};
declare function variantSubtle(props: Dict): {
    _text: {
        color: any;
    };
    _web: {
        outlineWidth: string;
    };
    bg: string;
    _hover: {
        _text: {
            color: any;
        };
        bg: any;
    };
    _pressed: {
        _text: {
            color: any;
        };
        bg: any;
    };
};
declare function variantLink(props: Dict): {
    _text: {
        textDecorationLine: string | undefined;
        color: any;
    };
    _hover: {
        _text: {
            color: any;
            textDecorationLine: string;
        };
    };
    _focusVisible: {
        _text: {
            color: any;
            textDecorationLine: string;
        };
    };
    _pressed: {
        _text: {
            color: any;
        };
    };
    bg?: undefined;
    _web?: undefined;
    _spinner?: undefined;
} | {
    _text: {
        textDecorationLine: string | undefined;
        color: any;
    };
    _hover: {
        _text: {
            color: any;
            textDecorationLine: string;
        };
    };
    _focusVisible: {
        _text: {
            color: any;
            textDecorationLine: string;
        };
    };
    _pressed: {
        _text: {
            color: any;
        };
    };
    bg: string;
    _web: {
        outlineWidth: string;
    };
    _spinner: {
        size: string;
    };
};
declare function variantUnstyled(): {};
export declare const ButtonGroup: {
    baseStyle: {
        direction: string;
    };
    defaultProps: {
        space: number;
    };
};
declare const _default: {
    baseStyle: (props: any) => {
        borderRadius: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        _web: {
            cursor: string;
        };
        _text: {
            fontWeight: string;
        };
        _focusVisible: {
            style: any;
        };
        _stack: {
            space: number;
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
        ghost: typeof variantGhost;
        outline: typeof variantOutline;
        solid: typeof variantSolid;
        subtle: typeof variantSubtle;
        link: typeof variantLink;
        unstyled: typeof variantUnstyled;
    };
    sizes: {
        lg: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
        };
        md: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
        };
        sm: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
            };
        };
        xs: {
            px: string;
            py: string;
            _text: {
                fontSize: string;
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
