export declare const Skeleton: {
    baseStyle: () => {
        startColor: string;
        _dark: {
            startColor: string;
        };
        endColor: string;
        overflow: string;
        fadeDuration: number;
        speed: number;
        h: string;
        w: string;
    };
};
export declare const SkeletonText: {
    baseStyle: () => {
        startColor: string;
        _dark: {
            startColor: string;
        };
        endColor: string;
        fadeDuration: number;
        w: string;
        speed: number;
        flexDirection: string;
        _line: {
            h: number;
            rounded: string;
        };
    };
    defaultProps: {
        lines: number;
        space: number;
    };
};
