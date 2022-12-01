import React from 'react';
import { ITheme } from './../theme';
import type { IColorModeProviderProps } from './color-mode';
import { INativebaseConfig } from './NativeBaseContext';
export interface NativeBaseProviderProps {
    theme?: ITheme;
    colorModeManager?: IColorModeProviderProps['colorModeManager'];
    children?: React.ReactNode;
    initialWindowMetrics?: any;
    config?: INativebaseConfig;
    isSSR?: boolean;
    disableContrastText?: boolean;
}
declare const NativeBaseProvider: (props: NativeBaseProviderProps) => JSX.Element;
export { NativeBaseProvider };
