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
    baseStyle: () => {
        shadow: number;
        rounded: string;
        maxHeight: string;
        overflow: string;
        bg: string;
        _text: {
            color: string;
        };
        _dark: {
            bg: string;
            _text: {
                color: string;
            };
        };
    };
};
export declare const ModalCloseButton: {
    baseStyle: () => {
        position: string;
        right: string;
        top: string;
        zIndex: string;
        colorScheme: string;
        p: string;
        bg: string;
        borderRadius: string;
        _web: {
            outlineWidth: number;
            cursor: string;
        };
        _icon: {
            color: string;
            size: string;
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
};
export declare const ModalHeader: {
    baseStyle: () => {
        p: string;
        borderBottomWidth: string;
        _text: {
            color: string;
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
        };
        bg: string;
        borderColor: string;
        _dark: {
            bg: string;
            borderColor: string;
            _text: {
                color: string;
            };
        };
    };
};
export declare const ModalBody: {
    baseStyle: () => {
        p: string;
        _text: {
            color: string;
        };
        _dark: {
            _text: {
                color: string;
            };
        };
    };
};
export declare const ModalFooter: {
    baseStyle: () => {
        p: string;
        flexDirection: string;
        justifyContent: string;
        flexWrap: string;
        borderTopWidth: number;
        bg: string;
        borderColor: string;
        _dark: {
            bg: string;
            borderColor: string;
        };
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
