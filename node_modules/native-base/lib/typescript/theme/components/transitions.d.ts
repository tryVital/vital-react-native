export declare const fadeBaseStyle: {
    initial: {
        opacity: number;
    };
    animate: {
        opacity: number;
        transition: {
            duration: number;
        };
    };
    exit: {
        opacity: number;
        transition: {
            duration: number;
        };
    };
};
export declare const Fade: {
    baseStyle: {
        initial: {
            opacity: number;
        };
        animate: {
            opacity: number;
            transition: {
                duration: number;
            };
        };
        exit: {
            opacity: number;
            transition: {
                duration: number;
            };
        };
    };
};
export declare const ScaleFade: {
    baseStyle: {
        initial: {
            opacity: number;
            scale: number;
        };
        animate: {
            opacity: number;
            scale: number;
            transition: number;
        };
        exit: {
            opacity: number;
            scale: number;
            transition: number;
        };
    };
};
export declare const Slide: {
    baseStyle: {
        h: string;
        pointerEvents: string;
        _overlay: {
            style: {
                overflow: string;
            };
        };
    };
    defaultProps: {
        duration: number;
        placement: string;
        overlay: boolean;
        _overlay: {
            isOpen: boolean;
        };
    };
};
export declare const SlideFade: {
    defaultProps: {
        duration: number;
        offsetX: number;
        offsetY: number;
    };
};
