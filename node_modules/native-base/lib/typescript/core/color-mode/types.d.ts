/// <reference types="react" />
export declare type ColorMode = 'light' | 'dark' | null | undefined;
export interface StorageManager {
    get(init?: ColorMode): Promise<ColorMode | undefined>;
    set(value: ColorMode): void;
}
export interface ColorModeOptions {
    initialColorMode?: ColorMode;
    useSystemColorMode?: boolean;
    accessibleColors?: boolean;
}
export declare type IColorModeProviderProps = {
    children?: React.ReactNode;
    options: ColorModeOptions;
    colorModeManager?: StorageManager;
};
export interface IColorModeContextProps {
    colorMode: ColorMode;
    toggleColorMode: () => void;
    setColorMode: (value: any) => void;
    accessibleColors: boolean;
    setAccessibleColors: (value: boolean) => void;
}
