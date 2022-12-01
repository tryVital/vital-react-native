export declare const Actionsheet: {
    defaultProps: {
        size: string;
        justifyContent: string;
        animationPreset: string;
    };
};
export declare const ActionsheetContent: {
    baseStyle: (props: any) => {
        alignItems: string;
        px: number;
        py: number;
        borderRadius: string;
        roundedTop: number;
        _dragIndicator: {
            bg: any;
            height: number;
            width: number;
            borderRadius: number;
        };
        _dragIndicatorWrapper: {
            pt: number;
            pb: number;
            mt: number;
            width: string;
            alignItems: string;
            collapsable: boolean;
        };
        _dragIndicatorWrapperOffSet: {
            py: number;
            collapsable: boolean;
        };
    };
};
export declare const ActionsheetItem: {
    baseStyle: (props: any) => {
        width: string;
        justifyContent: string;
        p: number;
        _text: {
            fontSize: number;
            fontWeight: string;
            color: any;
        };
        _pressed: {
            bg: any;
        };
        _hover: {
            bg: any;
        };
    };
    defaultProps: {
        variant: string;
    };
};
