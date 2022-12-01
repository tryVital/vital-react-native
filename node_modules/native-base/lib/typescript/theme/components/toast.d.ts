export declare const Toast: {
    baseStyle: (props: Record<string, any>) => {
        bg: any;
        p: string;
        rounded: string;
        shadow: number;
        _stack: {
            margin: string;
            position: string;
            space: number;
            alignItems: string;
            justifyContent: string;
            pointerEvents: string;
            _web: {
                position: string;
            };
        };
        _overlay: {};
        _presenceTransition: {
            animate: {
                opacity: number;
                transition: {
                    easing: import("react-native").EasingFunction;
                    duration: number;
                };
            };
            exit: {
                opacity: number;
                scale: number;
                transition: {
                    easing: import("react-native").EasingFunction;
                    duration: number;
                };
            };
        };
        _title: {
            color: string;
            fontWeight: number;
        };
        _description: {
            color: string;
            fontWeight: number;
        };
    };
    defaultProps: {};
};
