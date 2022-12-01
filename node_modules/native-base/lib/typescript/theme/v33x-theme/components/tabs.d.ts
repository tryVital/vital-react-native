declare function baseStyle(props: Record<string, any>): {
    activeTabStyle: {
        justifyContent: string;
        alignItems: string;
        mb: string;
        flexDirection: string;
        _text: {
            fontSize: string;
            fontWeight: string;
        };
    };
    inactiveTabStyle: {
        justifyContent: string;
        alignItems: string;
        mb: string;
        flexDirection: string;
        _text: {
            color: any;
            fontSize: string;
            fontWeight: string;
        };
    };
    activeIconProps: {
        color: any;
        name: string;
        mx: number;
    };
    inactiveIconProps: {
        name: string;
        mx: number;
    };
};
declare function variantOutline(props: Record<string, any>): {
    activeTabStyle: {
        borderColor: any;
        _text: {
            color: any;
        };
        _hover: {
            bg: any;
        };
        borderBottomWidth: number;
    };
    inactiveTabStyle: {
        borderColor: string;
        borderBottomWidth: number;
        _hover: {
            bg: any;
        };
    };
    tabBarStyle: {
        borderBottomWidth: number;
        borderColor: any;
    };
};
declare function variantFilled(props: Record<string, any>): {
    activeTabStyle: {
        borderColor: any;
        _text: {
            color: any;
        };
        _hover: {
            bg: any;
        };
        borderBottomWidth: number;
        bg: any;
    };
    inactiveTabStyle: {
        borderColor: string;
        borderBottomWidth: number;
        _hover: {
            bg: any;
        };
    };
    tabBarStyle: {
        borderBottomWidth: number;
        borderColor: any;
    };
};
declare function variantFilledOutline(props: Record<string, any>): {
    activeTabStyle: {
        borderColor: any;
        _text: {
            color: any;
        };
        _hover: {
            bg: any;
        };
        borderBottomWidth: number;
    };
    inactiveTabStyle: {
        borderColor: string;
        borderBottomWidth: number;
        _hover: {
            bg: any;
        };
    };
    tabBarStyle: {
        borderBottomWidth: number;
        borderColor: any;
        bg: any;
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
    variants: {
        outline: typeof variantOutline;
        filled: typeof variantFilled;
        'filled-outline': typeof variantFilledOutline;
    };
    sizes: {
        sm: {
            activeTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
            inactiveTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
        };
        md: {
            activeTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
            inactiveTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
        };
        lg: {
            activeTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
            inactiveTabStyle: {
                _text: {
                    fontSize: string;
                };
                py: number;
                px: number;
            };
        };
    };
    defaultProps: {
        size: string;
        variant: string;
        colorScheme: string;
    };
};
export default _default;
