declare function baseStyle(props: Record<string, any>): {
    bg: any;
    borderColor: any;
    borderWidth: number;
    borderBottomWidth: number;
    shadow: number;
    borderRadius: string;
    px: number;
    _text: {
        fontSize: string;
        fontWeight: string;
        fontFamily: string;
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    defaultProps: {};
};
export default _default;
