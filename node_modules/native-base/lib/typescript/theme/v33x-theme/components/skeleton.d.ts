export declare const Skeleton: {
    baseStyle: (props: Record<string, any>) => {
        startColor: any;
        endColor: string;
        overflow: string;
        fadeDuration: number;
        speed: number;
        h: string;
        w: string;
    };
};
export declare const SkeletonText: {
    baseStyle: (props: Record<string, any>) => {
        startColor: any;
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
