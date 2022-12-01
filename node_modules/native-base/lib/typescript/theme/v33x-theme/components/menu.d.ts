import { StyleSheet } from 'react-native';
declare function baseStyle(props: Record<string, any>): {
    bg: any;
    py: number;
    borderWidth: number;
    borderColor: any;
    borderRadius: string;
    _presenceTransition: {
        initial: {
            opacity: number;
            translateY: number;
        };
        animate: {
            opacity: number;
            translateY: number;
            transition: {
                duration: number;
            };
        };
        exit: {
            opacity: number;
            translateY: number;
            transition: {
                duration: number;
            };
        };
        style: import("react-native").RegisteredStyle<StyleSheet.AbsoluteFillStyle>;
    };
    _overlay: {};
    _backdrop: {
        bg: string;
    };
};
declare const _default: {
    baseStyle: typeof baseStyle;
};
export default _default;
export declare const MenuGroup: {
    baseStyle: (props: any) => {
        _title: {
            fontSize: string;
            fontWeight: number;
            textTransform: string;
            color: any;
        };
        p: number;
    };
};
export declare const MenuItem: {
    baseStyle: (props: any) => {
        px: number;
        py: number;
        outlineWidth: number | undefined;
        _stack: {
            alignItems: string;
            px: number;
            space: number;
        };
        _disabled: {
            _text: {
                color: any;
            };
        };
        _focus: {
            bg: any;
        };
        _pressed: {
            bg: any;
        };
        _icon: {
            size: number;
            color: any;
            opacity: number;
        };
        _checked: {
            _icon: {
                opacity: number;
            };
        };
    };
    defaultProps: {};
};
