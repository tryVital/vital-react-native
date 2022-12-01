export declare const SliderTrack: {
    baseStyle: ({ isVertical, size }: any) => {
        bg: string;
        borderRadius: string;
        overflow: string;
        style: {
            height: any;
            width: any;
        };
        _pressable: {
            alignItems: string;
            justifyContent: string;
            height: any;
            width: any;
            py: string | undefined;
            px: string | undefined;
        };
        _dark: {
            bg: string;
        };
    };
};
export declare const SliderThumb: {
    baseStyle: (props: any) => {
        borderRadius: string;
        zIndex: number;
        alignItems: string;
        justifyContent: string;
        scaleOnPressed: number;
        _interactionBox: {
            position: string;
            borderRadius: string;
            zIndex: number;
        };
        _stack: {
            direction: string;
            alignItems: string;
            justifyContent: string;
            space: number;
        };
        bg: string;
        _hover: {
            _web: {
                outlineWidth: string;
                outlineColor: any;
                outlineStyle: string;
            };
        };
        _focus: {
            _web: {
                outlineWidth: string;
                outlineColor: any;
                outlineStyle: string;
            };
        };
        _pressed: {
            _interactionBox: {
                borderWidth: string;
                borderColor: string;
            };
        };
        _dark: {
            bg: string;
            _hover: {
                _web: {
                    outlineWidth: string;
                    outlineColor: any;
                    outlineStyle: string;
                };
            };
            _focus: {
                _web: {
                    outlineWidth: string;
                    outlineColor: any;
                    outlineStyle: string;
                };
            };
            _pressed: {
                _interactionBox: {
                    borderWidth: string;
                    borderColor: string;
                };
            };
        };
        _web: {
            cursor: string;
        };
    };
    defaultProps: {
        colorScheme: string;
    };
    sizes: {
        lg: {
            _interactionBox: string;
        };
        md: {
            _interactionBox: string;
        };
        sm: {
            _interactionBox: string;
        };
    };
};
export declare const SliderFilledTrack: {
    baseStyle: ({ orientation, isReversed, sliderTrackPosition, size, colorScheme, }: any) => {
        left: number | undefined;
        bottom: number | undefined;
        right: number | undefined;
        top: number | undefined;
        style: {
            height: any;
            width: any;
        };
        bg: string;
        _dark: {
            bg: string;
        };
    };
    defaultProps: {
        colorScheme: string;
    };
};
export declare const Slider: {
    baseStyle: (props: any) => {
        alignItems: string;
        justifyContent: string;
        height: string | undefined;
        width: string | undefined;
        _disabled: {
            opacity: number;
            _web: {
                cursor: string;
            };
        };
    };
    defaultProps: {
        size: string;
    };
    sizes: {
        lg: {
            thumbSize: number;
            sliderTrackHeight: number;
            _interactionBox: {
                p: string;
            };
        };
        md: {
            thumbSize: number;
            sliderTrackHeight: number;
            _interactionBox: {
                p: string;
            };
        };
        sm: {
            thumbSize: number;
            sliderTrackHeight: number;
            _interactionBox: {
                p: string;
            };
        };
    };
};
