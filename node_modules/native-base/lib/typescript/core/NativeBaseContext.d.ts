/// <reference types="react" />
import type { ITheme } from './../theme';
import type { IModeType } from './StrictMode';
export interface INativebaseConfig {
    theme?: ITheme;
    suppressColorAccessibilityWarning?: boolean;
    dependencies?: {
        'linear-gradient': any;
    };
    enableRem?: boolean;
    strictMode?: IModeType;
    disableContrastText?: boolean;
}
export declare const defaultConfig: INativebaseConfig;
export declare const NativeBaseConfigProvider: {
    (props: {
        config: INativebaseConfig;
        currentBreakpoint: number;
        isSSR?: boolean | undefined;
        theme?: ITheme | undefined;
        disableContrastText?: boolean | undefined;
    } & {
        children: import("react").ReactNode;
    }): JSX.Element;
    displayName: string;
}, useNativeBaseConfig: (consumerName: string) => {
    config: INativebaseConfig;
    currentBreakpoint: number;
    isSSR?: boolean | undefined;
    theme?: ITheme | undefined;
    disableContrastText?: boolean | undefined;
};
