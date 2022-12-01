export declare const Actionsheet: {
    defaultProps: {
        size: string;
        justifyContent: string;
        animationPreset: string;
    };
};
export declare const ActionsheetContent: {
    baseStyle: () => {
        alignItems: string;
        px: number;
        py: number;
        borderRadius: string;
        roundedTop: number;
        _web: {
            userSelect: string;
        };
        _dragIndicator: {
            height: number;
            width: number;
            borderRadius: number;
            bg: string;
        };
        _dark: {
            _dragIndicator: {
                bg: string;
            };
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
    baseStyle: () => {
        width: string;
        justifyContent: string;
        _stack: {
            space: number;
        };
        p: number;
        _text: {
            color: string;
            fontSize: string;
            fontWeight: string;
        };
        _disabled: {
            opacity: number;
        };
        bg: string;
        _icon: {
            color: string;
        };
        _hover: {
            bg: string;
        };
        _pressed: {
            bg: string;
        };
        _focusVisible: {
            _web: {
                outlineWidth: string;
                style: {
                    boxShadow: string;
                };
                bg: string;
            };
            bg: string;
        };
        _dark: {
            bg: string;
            _icon: {
                color: string;
            };
            _text: {
                color: string;
            };
            _hover: {
                bg: string;
            };
            _pressed: {
                bg: string;
            };
            _focusVisible: {
                _web: {
                    outlineWidth: string;
                    style: {
                        boxShadow: string;
                    };
                    bg: string;
                };
            };
        };
    };
};
