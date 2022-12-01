export declare const Modal: {
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
        _slide: {
            overlay: boolean;
            duration: number;
        };
        _fade: {
            exitDuration: number;
            entryDuration: number;
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
export declare const ModalContent: {
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
export declare const ModalCloseButton: {
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
export declare const ModalHeader: {
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
export declare const ModalBody: {
    baseStyle: (props: Record<string, any>) => {
        pt: string;
        p: string;
        _text: {
            color: any;
        };
    };
};
export declare const ModalFooter: {
    baseStyle: (props: Record<string, any>) => {
        p: string;
        bg: any;
        flexDirection: string;
        justifyContent: string;
        flexWrap: string;
    };
};
export declare const ModalOverlay: {
    baseStyle: {
        position: string;
        left: string;
        top: string;
        opacity: string;
        right: string;
        bottom: string;
    };
};
