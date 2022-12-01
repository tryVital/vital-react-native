export declare const SliderTrack: {
    baseStyle: ({ isVertical, size, ...props }: any) => {
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
    };
};
export declare const SliderThumb: {
    baseStyle: (props: any) => {
        borderRadius: number;
        zIndex: number;
        alignItems: string;
        justifyContent: string;
        bg: any;
        scaleOnPressed: number;
    };
};
export declare const SliderFilledTrack: {
    baseStyle: ({ orientation, isReversed, sliderTrackPosition, size, ...props }: any) => {
        bg: any;
        left: number | undefined;
        bottom: number | undefined;
        right: number | undefined;
        top: number | undefined;
        style: {
            height: any;
            width: any;
        };
    };
};
export declare const Slider: {
    baseStyle: (props: any) => {
        alignItems: string;
        justifyContent: string;
        height: string | undefined;
        width: string | undefined;
    };
    defaultProps: {
        size: string;
    };
    sizes: {
        lg: {
            thumbSize: number;
            sliderSize: number;
        };
        md: {
            thumbSize: number;
            sliderSize: number;
        };
        sm: {
            thumbSize: number;
            sliderSize: number;
        };
    };
};
