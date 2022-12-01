export declare const AlertDialog: {
    baseStyle: {
        width: string;
        height: string;
        justifyContent: string;
        alignItems: string;
        _web: {
            pointerEvents: string;
        };
        _backdropFade: {
            exitDuration: number;
            entryDuration: number;
        };
        _fade: {
            exitDuration: number;
            entryDuration: number;
        };
        _slide: {
            duration: number;
            overlay: boolean;
        };
    };
    sizes: {
        xs: {
            contentSize: {
                width: string;
                maxWidth: string;
            };
        };
        sm: {
            contentSize: {
                width: string;
                maxWidth: string;
            };
        };
        md: {
            contentSize: {
                width: string;
                maxWidth: string;
            };
        };
        lg: {
            contentSize: {
                width: string;
                maxWidth: string;
            };
        };
        xl: {
            contentSize: {
                width: string;
                maxWidth: string;
            };
        };
        full: {
            contentSize: {
                width: string;
            };
        };
    };
    defaultProps: {
        size: string;
        closeOnOverlayClick: boolean;
    };
};
export declare const AlertDialogContent: {
    baseStyle: (props: Record<string, any>) => {
        bg: any;
        _text: {
            color: any;
        };
        shadow: number;
        rounded: string;
        maxHeight: string;
        overflow: string;
    };
};
export declare const AlertDialogCloseButton: {
    baseStyle: (props: Record<string, any>) => {
        position: string;
        right: string;
        top: string;
        zIndex: string;
        colorScheme: string;
        p: string;
        _icon: {
            size: string;
            color: any;
        };
    };
};
export declare const AlertDialogHeader: {
    baseStyle: (props: Record<string, any>) => {
        py: string;
        px: string;
        borderBottomWidth: string;
        borderColor: any;
        _text: {
            fontSize: string;
            fontWeight: string;
            color: any;
            lineHeight: string;
        };
    };
};
export declare const AlertDialogBody: {
    baseStyle: (props: Record<string, any>) => {
        pt: string;
        p: string;
        _text: {
            color: any;
        };
    };
};
export declare const AlertDialogFooter: {
    baseStyle: (props: Record<string, any>) => {
        p: string;
        bg: any;
        flexDirection: string;
        justifyContent: string;
        flexWrap: string;
    };
};
export declare const AlertDialogOverlay: {
    baseStyle: {
        position: string;
        left: string;
        top: string;
        opacity: string;
        right: string;
        bottom: string;
    };
};
