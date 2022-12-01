declare function variantSolid(props: Record<string, any>): {
    bg: any;
    _text: {
        color: any;
    };
    borderWidth: string;
    borderColor: string;
    borderRadius: string;
};
declare function variantSubtle(props: Record<string, any>): {
    bg: any;
    _text: {
        color: any;
    };
    borderWidth: string;
    borderRadius: string;
    borderColor: string;
};
declare function variantOutline(props: Record<string, any>): {
    borderColor: any;
    _text: {
        color: any;
    };
    borderRadius: string;
    borderWidth: string;
};
declare const _default: {
    baseStyle: {
        px: string;
        py: string;
        alignItems: string;
        _text: {
            fontSize: string;
            fontWeight: string;
        };
    };
    variants: {
        solid: typeof variantSolid;
        subtle: typeof variantSubtle;
        outline: typeof variantOutline;
    };
    defaultProps: {
        variant: string;
        colorScheme: string;
    };
};
export default _default;
