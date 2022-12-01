import { Dict } from '../tools';
declare function variantGhost(props: Dict): {
    bg: string;
    _web: {
        outlineWidth: number;
    };
    _hover: {
        bg: string;
    };
    _focusVisible: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
};
declare function variantOutline(props: Dict): {
    borderWidth: string;
    borderColor: string;
    _icon: {
        color: any;
    };
    _web: {
        outlineWidth: number;
    };
    _hover: {
        bg: string;
    };
    _focusVisible: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
};
declare function variantSolid(props: Dict): {
    bg: string;
    _web: {
        outlineWidth: number;
    };
    _disabled: {
        bg: any;
    };
    _hover: {
        bg: string;
    };
    _pressed: {
        bg: string;
    };
    _focus: {
        bg: string;
    };
    _icon: {
        color: any;
    };
};
declare function variantUnstyled(): {};
declare const _default: {
    baseStyle: (props: any) => {
        borderRadius: string;
        _web: {
            cursor: string;
        };
        _focusVisible: {
            style: {
                boxShadow: string;
            } | {
                boxShadow?: undefined;
            };
        };
        _disabled: {
            opacity: number;
        };
    };
    variants: {
        ghost: typeof variantGhost;
        outline: typeof variantOutline;
        solid: typeof variantSolid;
        unstyled: typeof variantUnstyled;
    };
    sizes: {
        lg: {
            p: number;
        };
        md: {
            p: number;
        };
        sm: {
            p: number;
        };
    };
    defaultProps: {
        variant: string;
        size: string;
        colorScheme: string;
    };
};
export default _default;
